import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
import ec2Data from '../assets/awsIcons/Architecture-Service-Icons/Arch_Compute/Arch_Amazon-EC2_64.svg';
import elbData from '../assets/awsIcons/Architecture-Service-Icons/Arch_Networking-Content-Delivery/Arch_Elastic-Load-Balancing_64.svg';
 
import 'reactflow/dist/style.css';
import { ResourceNode } from './Resource';
 
const nodeTypes = {
  ec2Node: () => <ResourceNode data={ec2Data} alt="ec2" />,
  elbNode: () => <ResourceNode data={elbData} alt="elb" />,
}
const initialNodes = [
  { id: '1', type: 'ec2Node', position: { x: 0, y: 0 }, data: { label: 'EC2' } },
  { id: '2', type: 'elbNode', position: { x: 0, y: 100 }, data: { label: 'ELB' } },
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
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}