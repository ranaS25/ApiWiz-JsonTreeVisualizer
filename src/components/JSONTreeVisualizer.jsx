import  { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Toolbar from './Toolbar';

import ObjectNode from './nodes/ObjectNode';
import ArrayNode from './nodes/ArrayNode';
import PrimitiveNode from './nodes/PrimitiveNode';

import { buildTreeTwoPass } from '../utils/treeBuilder';
import { sanitizeEdges } from '../utils/sanitize';

const SAMPLE_JSON = `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "New York",
      "country": "USA"
    }
  },
  "items": [
    { "name": "item1" },
    { "name": "item2" }
  ]
}`;

const nodeTypes = {
  object: ObjectNode,
  array: ArrayNode,
  primitive: PrimitiveNode,
};

export default function JSONTreeVisualizer() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const defaultEdgeOptions = {
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: darkMode ? '#e5e7eb' : '#111827', strokeWidth: 2 },
  };

  // generate tree from json input
  const generateTree = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setError('');
      const { nodes: newNodes, edges: newEdges } = buildTreeTwoPass(parsed);

      setNodes(newNodes);
      setEdges(sanitizeEdges(newEdges));

      // debug logs
      console.log('Generated nodes count:', newNodes.length);
      console.log('Generated edges count:', newEdges.length);

      // fit view after nodes/edges applied
      setTimeout(() => reactFlowInstance?.fitView({ padding: 0.12 }), 50);
      setSearchMessage('');
    } catch (err) {
      setError('Invalid JSON: ' + err.message);
      setNodes([]);
      setEdges([]);
    }
  }, [jsonInput, setNodes, setEdges, reactFlowInstance]);

  // small test graph to verify edges render
  const createTestGraph = useCallback(() => {
    const n1 = { id: 'test-1', type: 'object', data: { label: 'A', path: '$.A', highlighted: false }, position: { x: 0, y: 0 } };
    const n2 = { id: 'test-2', type: 'primitive', data: { label: 'B', value: 123, path: '$.A.B', highlighted: false }, position: { x: 220, y: 0 } };
    const e1 = { id: 'edge-test-1-2', source: 'test-1', target: 'test-2', type: 'smoothstep' };

    setNodes([n1, n2]);
    setEdges(sanitizeEdges([e1]));
    setTimeout(() => reactFlowInstance?.fitView({ padding: 0.12 }), 50);
  }, [setNodes, setEdges, reactFlowInstance]);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchMessage('Please enter a search query');
      return;
    }

    const updated = nodes.map((n) => ({ ...n, data: { ...n.data, highlighted: false } }));
    const normalized = searchQuery.trim().replace(/^\$\.?/, '$.');
    const matches = updated.filter((n) => n.data.path && n.data.path.toLowerCase().includes(normalized.toLowerCase()));

    if (matches.length) {
      matches.forEach((m) => (m.data.highlighted = true));
      setSearchMessage(`Match found: ${matches.length} result(s)`);
      setNodes(updated);
      setTimeout(() => {
        if (reactFlowInstance && matches[0]) {
          reactFlowInstance.setCenter(matches[0].position.x, matches[0].position.y, { zoom: 1, duration: 600 });
        }
      }, 50);
    } else {
      setSearchMessage('No match found');
    }
  }, [searchQuery, nodes, setNodes, reactFlowInstance]);

  const onNodeClick = useCallback((event, node) => {
    if (node.data?.path) {
      try {
        navigator.clipboard.writeText(node.data.path);
        alert(`Path copied: ${node.data.path}`);
      } catch (e) {
        console.warn('Clipboard failed', e);
      }
    }
  }, []);

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Toolbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        createTestGraph={createTestGraph}
      />

      <div className="flex-1 flex overflow-hidden">
        <LeftPanel
          jsonInput={jsonInput}
          setJsonInput={setJsonInput}
          generateTree={generateTree}
          handleClear={() => {
            setJsonInput('');
            setNodes([]);
            setEdges([]);
            setError('');
            setSearchQuery('');
            setSearchMessage('');
          }}
          handleDownload={() => {
            if (!reactFlowInstance) return;
            const flow = reactFlowInstance.toObject();
            const dataStr = JSON.stringify(flow, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const link = document.createElement('a');
            link.setAttribute('href', dataUri);
            link.setAttribute('download', 'json-tree.json');
            link.click();
          }}
          error={error}
          darkMode={darkMode}
        />

        <RightPanel
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onInit={(inst) => setReactFlowInstance(inst)}
          nodeTypes={nodeTypes}
          fitView
          className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}
          defaultEdgeOptions={defaultEdgeOptions}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          searchMessage={searchMessage}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}
