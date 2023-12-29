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
    NodeTypes,
} from 'reactflow';
import { shallow } from 'zustand/shallow';

import { nodeTypes } from './nodeTypes';


type RFState = {
    nodes: Node[],
    edges: Edge[],
    nodeTypes: NodeTypes,
    rfInstance: ReactFlowInstance | null,
    onNodesChange: OnNodesChange,
    onEdgesChange: OnEdgesChange,
    onConnect: OnConnect,
    onInit: OnInit,
    addNode: (key: string) => void,
}


const initialNodes: RFState['nodes'] = [
    { 
        id: '1',
        data: { label: 'VPC' },
        position: { x: 75, y: 75 },
        type: 'VirtualPrivateCloudVPC',

        style: { width: 360, height: 360 },
    },
    { 
        id: '2',
        data: { label: 'ELB' },
        position: { x: 148, y: 50 },
        type: 'ElasticLoadBalancing',
        parentNode: '1',
    },
    {
        id: '3',
        data: { label: 'EC2' },
        position: { x: 88, y: 250 },
        type: 'AmazonEC2',
        parentNode: '1'
    },
    {
        id: '4',
        data: { label: 'EC2' },
        position: { x: 208, y: 250 },
        type: 'AmazonEC2',
        parentNode: '1'
    },
];

const initialEdges: RFState['edges'] = [
    { id: '2-3', source: '2', target: '3' },
    { id: '2-4', source: '2', target: '4' },
];


export const useGamePlanStore = createWithEqualityFn<RFState>(
    (set, get) => ({
        nodes: initialNodes,
        edges: initialEdges,
        rfInstance: null,
        nodeTypes,
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