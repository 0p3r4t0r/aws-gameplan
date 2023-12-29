import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow';
 
import 'reactflow/dist/style.css';
import { ServiceSelector } from './services/ServiceSelector';
import { services } from './services';
import { useGamePlanStore } from '../store';
import { ConsoleLogDiagram } from './utils/ConsoleLogDiagram';

export default function MainFlow() {
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

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ConsoleLogDiagram />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={services}
        onInit={onInit}
      >
        <ServiceSelector services={services} />
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}