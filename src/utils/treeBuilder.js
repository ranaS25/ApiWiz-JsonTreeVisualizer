
export const buildTreeTwoPass = (json) => {
  const nodesAcc = [];
  const edgesAcc = [];
  const horizontalSpacing = 220;
  const verticalSpacing = 100;
  let counter = 0;

  const getNodeType = (value) => {
    if (value === null) return 'primitive';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return 'primitive';
  };

  const makeNodes = (value, parentId = null, key = 'root', path = '$', level = 0) => {
    const nodeId = `node-${Math.random().toString(36).slice(2, 9)}`;
    const nodeType = getNodeType(value);
    const position = { x: level * horizontalSpacing, y: counter * verticalSpacing };
    counter += 1;

    const baseNode = {
      id: nodeId,
      type: nodeType === 'object' ? 'object' : nodeType === 'array' ? 'array' : 'primitive',
      data:
        nodeType === 'primitive'
          ? { label: key, value, path, highlighted: false }
          : { label: key, path, highlighted: false },
      position,
      __parentId: parentId,
    };

    nodesAcc.push(baseNode);

    if (nodeType === 'object') {
      for (const [childKey, childValue] of Object.entries(value)) {
        const childPath = `${path}.${childKey}`;
        makeNodes(childValue, nodeId, childKey, childPath, level + 1);
      }
    } else if (nodeType === 'array') {
      value.forEach((item, idx) => {
        const childPath = `${path}[${idx}]`;
        makeNodes(item, nodeId, String(idx), childPath, level + 1);
      });
    }

    return nodeId;
  };

  makeNodes(json, null, 'root', '$', 0);

  // second pass: edges
  for (const n of nodesAcc) {
    if (n.__parentId) {
      const parentExists = nodesAcc.find((p) => p.id === n.__parentId);
      if (parentExists) {
        edgesAcc.push({
          id: `edge-${n.__parentId}-${n.id}`,
          source: n.__parentId,
          target: n.id,
          type: 'smoothstep',
        });
      } else {
        // unexpected; log for debugging
        // eslint-disable-next-line no-console
        console.warn('Parent missing for node', n.id, 'parentId:', n.__parentId);
      }
    }
    delete n.__parentId;
  }

  return { nodes: nodesAcc, edges: edgesAcc };
};
