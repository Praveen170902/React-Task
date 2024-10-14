import React, { useContext, useState } from 'react';
import { DiagramContext } from '../context/DiagramContext';

const Sidebar = () => {
  const {
    nodes,
    edges,
    addNode,
    addEdge,
    removeNode,
    removeEdge,
    updateNode,
    updateEdge,
  } = useContext(DiagramContext);

  const [nodeLabel, setNodeLabel] = useState('');
  const [edgeSource, setEdgeSource] = useState('');
  const [edgeTarget, setEdgeTarget] = useState('');

  const handleAddNode = (e) => {
    e.preventDefault();
    if (nodeLabel.trim() === '') return;
    addNode(nodeLabel);
    setNodeLabel('');
  };

  const handleAddEdge = (e) => {
    e.preventDefault();
    if (edgeSource.trim() === '' || edgeTarget.trim() === '') return;
    addEdge(edgeSource, edgeTarget);
    setEdgeSource('');
    setEdgeTarget('');
  };

  return (
    <div className="sidebar">
      <h2>Add Node</h2>
      <form onSubmit={handleAddNode}>
        <input
          type="text"
          placeholder="Node Label"
          value={nodeLabel}
          onChange={(e) => setNodeLabel(e.target.value)}
          required
        />
        <button type="submit">Add Node</button>
      </form>

      <h2>Add Edge</h2>
      <form onSubmit={handleAddEdge}>
        <input
          type="text"
          placeholder="Source ID"
          value={edgeSource}
          onChange={(e) => setEdgeSource(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Target ID"
          value={edgeTarget}
          onChange={(e) => setEdgeTarget(e.target.value)}
          required
        />
        <button type="submit">Add Edge</button>
      </form>

      <h2>Existing Nodes</h2>
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            {node.data.label} (ID: {node.id})
            <button onClick={() => removeNode(node.id)}>Delete</button>
            {/* Implement Edit functionality as needed */}
          </li>
        ))}
      </ul>

      <h2>Existing Edges</h2>
      <ul>
        {edges.map((edge) => (
          <li key={edge.id}>
            {edge.source} → {edge.target} (ID: {edge.id})
            <button onClick={() => removeEdge(edge.id)}>Delete</button>
            {/* Implement Edit functionality as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
 
