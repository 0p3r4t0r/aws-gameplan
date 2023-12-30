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
import { Groups } from '../__generated__/groups';


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


// Ensure that services inside a group can be clicked.
const groupProperties: Partial<Node> = {
    dragHandle: ".group-drag-handle",
    selectable: false,
    zIndex: -10,
}


const initialNodes: RFState['nodes'] = [
    {
        id: '1',
        data: { label: 'VPC' },
        position: { x: 100, y: 100 },
        type: 'VirtualPrivateCloudVPC',
        style: { width: 360, height: 360 },
        ...groupProperties,
    },
    {
        id: '2',
        data: { label: 'ELB' },
        position: { x: 248, y: 150 },
        type: 'ElasticLoadBalancing',
    },
    {
        id: '3',
        data: { label: 'EC2' },
        position: { x: 166, y: 300 },
        type: 'AmazonEC2',
    },
    {
        id: '4',
        data: { label: 'EC2' },
        position: { x: 330, y: 300 },
        type: 'AmazonEC2',
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
            const newNode = {
                id: newNodeId,
                data: { label: key },
                position: { x: 50, y: 50 },
                type: key,

                ...(key in Groups && groupProperties)
            };
            set({
                nodes: [...nodes, newNode]
            })
        }
    }),
    shallow,
);