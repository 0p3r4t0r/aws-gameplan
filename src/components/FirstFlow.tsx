import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
 
import 'reactflow/dist/style.css';
import { ServiceSelector } from './services/ServiceSelector';
import { AWS } from './services';
 
// TODO: ensure type property belongs to aws nodes.
const initialNodes = [
  { id: '1', type: 'ec2', position: { x: 0, y: 100 }, data: { label: 'EC2' } },
  { id: '2', type: 'elb', position: { x: 0, y: 200 }, data: { label: 'ELB' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function FirstFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params: Parameters<typeof addEdge>[0]) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={AWS.services}
      >
        {/* TODO: use state to avoid prop-drilling? */}
        <ServiceSelector services={AWS.services} nodes={nodes} setNodes={setNodes}/>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}