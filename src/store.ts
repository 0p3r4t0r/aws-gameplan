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
} from 'reactflow';
import { shallow } from 'zustand/shallow';


type RFState = {
    // base
    nodes: Node[],
    edges: Edge[],
    onNodesChange: OnNodesChange,
    onEdgesChange: OnEdgesChange,
    onConnect: OnConnect,

    // custom
    addNode: (key: string) => void,
}


const initialNodes = [
    { id: '1', type: 'ec2', position: { x: 100, y: 250 }, data: { label: 'EC2' } },
    { id: '2', type: 'ec2', position: { x: 200, y: 250 }, data: { label: 'EC2' } },
    { id: '3', type: 'ec2', position: { x: 300, y: 250 }, data: { label: 'EC2' } },
    { id: '4', type: 'elb', position: { x: 200, y: 100 }, data: { label: 'ELB' } },
];

const initialEdges = [
    { id: 'e1b_4-ec2_1', source: '4', target: '1' },
    { id: 'e1b_4-ec2_2', source: '4', target: '2' },
    { id: 'e1b_4-ec2_3', source: '4', target: '3' },
];


export const useGamePlanStore = createWithEqualityFn<RFState>(
    (set, get) => ({
        nodes: initialNodes,
        edges: initialEdges,
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