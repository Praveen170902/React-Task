import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create Context
export const DiagramContext = createContext();

// Provider Component
export const DiagramProvider = ({ children }) => {
  const [nodes, setNodes] = useState([
    // Initial nodes can be defined here
    {
      id: '1',
      type: 'default',
      data: { label: 'Start Node' },
      position: { x: 250, y: 5 },
    },
  ]);

  const [edges, setEdges] = useState([]);

  // Add Node
  const addNode = (label, type = 'default') => {
    const newNode = {
      id: uuidv4(),
      type,
      data: { label },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // Remove Node
  const removeNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  // Update Node
  const updateNode = (id, updatedData) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, ...updatedData } : node))
    );
  };

  // Add Edge
  const addEdge = (source, target, animated = false) => {
    const newEdge = {
      id: uuidv4(),
      source,
      target,
      type: 'default',
      animated,
    };
    setEdges((eds) => eds.concat(newEdge));
  };

  // Remove Edge
  const removeEdge = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  // Update Edge
  const updateEdge = (id, updatedData) => {
    setEdges((eds) =>
      eds.map((edge) => (edge.id === id ? { ...edge, ...updatedData } : edge))
    );
  };

  return (
    <DiagramContext.Provider
      value={{
        nodes,
        edges,
        addNode,
        removeNode,
        updateNode,
        addEdge,
        removeEdge,
        updateEdge,
        setNodes,
        setEdges,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
};

