import React, { useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow';
 
import 'reactflow/dist/style.css';
import { ComponentSelector } from './molecules/ComponentSelector';
import { nodeTypes } from '../store/nodeTypes';
import { useGamePlanStore } from '../store';
import { ConsoleLogDiagram } from './molecules/ConsoleLogDiagram';

export default function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onInit } = useGamePlanStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      onInit: state.onInit,
    })
  );

  // TODO - update the hash when the nodes change.
  useEffect(() => {
    console.log(window.location.href)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ConsoleLogDiagram />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={onInit}
      >
        <ComponentSelector />
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}