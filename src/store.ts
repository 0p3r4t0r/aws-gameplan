// https://reactflow.dev/learn/advanced-use/state-management

import { createWithEqualityFn } from 'zustand/traditional';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    ReactFlowInstance,
    OnInit,
} from 'reactflow';
import { shallow } from 'zustand/shallow';


type RFState = {
    nodes: Node[],
    edges: Edge[],
    rfInstance: ReactFlowInstance | null,
    onNodesChange: OnNodesChange,
    onEdgesChange: OnEdgesChange,
    onConnect: OnConnect,
    onInit: OnInit,
    addNode: (key: string) => void,
}


const initialNodes: RFState['nodes'] = [
    { id: '1', type: 'ec2', position: { x: 100, y: 250 }, data: { label: 'EC2' } },
    { id: '2', type: 'ec2', position: { x: 200, y: 250 }, data: { label: 'EC2' } },
    { id: '3', type: 'ec2', position: { x: 300, y: 250 }, data: { label: 'EC2' } },
    { id: '4', type: 'elb', position: { x: 200, y: 100 }, data: { label: 'ELB' } },
    { id: '5', type: 'vpc', position: { x: 75, y: 75 }, data: { label: 'VPC' } },
];

const initialEdges: RFState['edges'] = [
    { id: 'elb_4-ec2_1', source: '4', target: '1' },
    { id: 'elb_4-ec2_2', source: '4', target: '2' },
    { id: 'elb_4-ec2_3', source: '4', target: '3' },
];


export const useGamePlanStore = createWithEqualityFn<RFState>(
    (set, get) => ({
        nodes: initialNodes,
        edges: initialEdges,
        rfInstance: null,
        onNodesChange: (changes: NodeChange[]) => {
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },
        onEdgesChange: (changes: EdgeChange[]) => {
            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },
        onConnect: (connection: Connection) => {
            set({
                edges: addEdge(connection, get().edges),
            });
        },
        onInit: (rfInstance) => {
            set({ rfInstance })
        },
        addNode: (key) => {
            console.log(key);
            const nodes = get().nodes;

            const newNodeId = (nodes.length + 1).toString();
            const newNode = {id : newNodeId, type: key, position: { x: 50, y: 50 }, data: { label: key }};
            set({
                nodes: [...nodes, newNode]
            })
        }
    }),
    shallow,
);