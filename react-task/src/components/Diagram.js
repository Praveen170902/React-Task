import React, { useContext, useCallback } from 'react';
import ReactFlow, {
  removeElements,
  addEdge as reactFlowAddEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';
import { DiagramContext } from '../context/DiagramContext';

const Diagram = () => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    removeNode,
    removeEdge,
  } = useContext(DiagramContext);

  const onElementsRemove = (elementsToRemove) => {
    elementsToRemove.forEach((el) => {
      if (el.source && el.target) {
        removeEdge(el.id);
      } else {
        removeNode(el.id);
      }
    });
  };

  const onConnect = (params) => {
    // Here you can add validations before adding an edge
    setEdges((eds) => eds.concat({ ...params, id: `${params.source}-${params.target}`, animated: false }));
  };

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  return (
    <div className="diagram">
      <ReactFlow
        elements={[...nodes, ...edges]}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        deleteKeyCode={46} /* 'delete'-key */
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            if (n.type === 'default') return '#1a192b';
            return '#eee';
          }}
          nodeColor={(n) => {
            if (n.type === 'selectorNode') return '#faff00';
            return '#fff';
          }}
        />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default Diagram;                                                                                                                                                               

