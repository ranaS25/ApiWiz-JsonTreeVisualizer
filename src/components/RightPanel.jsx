import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import SearchBar from './SearchBar';

export default function RightPanel({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onNodeClick,
  onInit,
  nodeTypes,
  fitView,
  className,
  defaultEdgeOptions,
  searchQuery,
  setSearchQuery,
  handleSearch,
  searchMessage,
  darkMode,
}) {
  return (
    <div className="flex-1 flex flex-col">
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4`}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          searchMessage={searchMessage}
          darkMode={darkMode}
        />
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onInit={onInit}
          nodeTypes={nodeTypes}
          fitView={fitView}
          className={className}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Background color={darkMode ? '#374151' : '#e5e7eb'} />
          <Controls />
          <MiniMap
            nodeColor={(n) => {
              if (n.type === 'object') return '#3b82f6';
              if (n.type === 'array') return '#10b981';
              return '#f59e0b';
            }}
            className={darkMode ? 'bg-gray-800' : 'bg-white'}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
