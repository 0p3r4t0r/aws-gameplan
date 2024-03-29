// https://reactflow.dev/learn/advanced-use/state-management

import { createWithEqualityFn } from 'zustand/traditional'
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
    ReactFlowJsonObject,
} from 'reactflow'
import queryString from 'query-string'
import { shallow } from 'zustand/shallow'
import { debounce } from 'lodash'

import { nodeTypes } from './nodeTypes'
import { Groups } from '../__generated__/groups'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../supabaseClient'

type RFState = {
    nodes: Node[]
    edges: Edge[]
    nodeTypes: NodeTypes
    rfInstance: ReactFlowInstance | null
    stateLoadedFromUrl: boolean
    session: Session | null
    onNodesChange: OnNodesChange
    onEdgesChange: OnEdgesChange
    onConnect: OnConnect
    onInit: OnInit
    addNode: (key: string) => void
    editNodeData: (id: string, data: Object) => void,
    loadStateFromUrlHash: (state: string) => void
    updateStateLoadedFromUrl: () => void
    saveToUrl: () => void
}

// Ensure that services inside a group can be clicked.
const groupProperties: Partial<Node> = {
    dragHandle: '.group-drag-handle',
    style: { width: 360, height: 360, pointerEvents: 'none' },
}

/**
 * Nodes removes as initial nodes are now loaded from url.
 * Comment preserved as an example.
 */
const initialNodes: RFState['nodes'] = [
    // {
    //     id: '1',
    //     data: { label: 'VPC' },
    //     position: { x: 100, y: 100 },
    //     type: 'VirtualPrivateCloudVPC',
    //     style: { width: 360, height: 360 },
    //     ...groupProperties,
    // },
    // {
    //     id: '2',
    //     data: { label: 'ELB' },
    //     position: { x: 248, y: 150 },
    //     type: 'ElasticLoadBalancing',
    // },
    // {
    //     id: '3',
    //     data: { label: 'EC2' },
    //     position: { x: 166, y: 300 },
    //     type: 'AmazonEC2',
    // },
    // {
    //     id: '4',
    //     data: { label: 'EC2' },
    //     position: { x: 330, y: 300 },
    //     type: 'AmazonEC2',
    // },
]

/**
 * Edges removes as initial edges are now loaded from url.
 * Comment preserved as an example.
 */
const initialEdges: RFState['edges'] = [
    // { id: '2-3', source: '2', targetState: '3' },
    // { id: '2-4', source: '2', targetState: '4' },
]

export const useGamePlanStore = createWithEqualityFn<RFState>(
    (setState, getState) => ({
        nodes: initialNodes,
        edges: initialEdges,
        rfInstance: null,
        stateLoadedFromUrl: false,
        nodeTypes,
        session: null,
        loading: true,
        onNodesChange: (changes: NodeChange[]) => {
            setState({
                nodes: applyNodeChanges(changes, getState().nodes),
            })
            getState().saveToUrl()
        },
        onEdgesChange: (changes: EdgeChange[]) => {
            setState({
                edges: applyEdgeChanges(changes, getState().edges),
            })
            getState().saveToUrl()
        },
        onConnect: (connection: Connection) => {
            setState({
                edges: addEdge(connection, getState().edges),
            })
            getState().saveToUrl()
        },
        onInit: async (rfInstance) => {
            supabase.auth.onAuthStateChange((event, session) => {
                if (
                    session?.access_token !== getState().session?.access_token
                ) {
                    setState({ session })
                }
            })
            await supabase.auth.getSession()
            setState({ rfInstance })
        },
        addNode: (key) => {
            const nodes = getState().nodes

            const newNodeId = (nodes.length + 1).toString()
            const newNode: Node = {
                id: newNodeId,
                data: { label: key, text: '' },
                position: { x: 100, y: 200 },
                type: key,

                ...(key in Groups && groupProperties),
            }
            setState({
                nodes: [...nodes, newNode],
            })
        },
        editNodeData: (id, data) => {
            const nodes = getState().nodes

            const editedNode = nodes[nodes.findIndex(node => node.id == id)]
            editedNode.data = { ...editedNode.data, ...data }
            setState({
                nodes: [...nodes],
            })
            getState().saveToUrl()
        },
        loadStateFromUrlHash: (stateString) => {
            const rfInstance = getState().rfInstance
            if (rfInstance) {
                const stateObject = queryString.parse(stateString)
                const state = JSON.parse(
                    stateObject.state as string
                ) as ReactFlowJsonObject
                rfInstance.setNodes(state.nodes)
                rfInstance.setEdges(state.edges)
                rfInstance.setViewport(state.viewport)
            }
        },
        /**
         * You can only load the state from the URL once.
         */
        updateStateLoadedFromUrl: () => {
            setState({ stateLoadedFromUrl: true })
        },
        saveToUrl: debounce(() => {
            if (!getState().stateLoadedFromUrl) return

            const state = getState().rfInstance!.toObject()
            window.location.hash = queryString.stringify({
                state: JSON.stringify(state),
            })
        }, 250),
    }),
    shallow
)
