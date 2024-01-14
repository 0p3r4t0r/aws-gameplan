import React, { useEffect } from 'react'
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    BackgroundVariant,
    ReactFlowJsonObject,
} from 'reactflow'
import queryString from 'query-string'

import 'reactflow/dist/style.css'
import { ComponentSearchable } from './molecules/ComponentSearchable'
import { nodeTypes } from '../store/nodeTypes'
import { useGamePlanStore } from '../store'
import Auth from './molecules/Auth'
import { Loading } from './atoms/Loading'

export default function Flow() {
    const {
        nodes,
        edges,
        rfInstance,
        stateLoadedFromUrl,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onInit,
        updateStateLoadedFromUrl,
    } = useGamePlanStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        rfInstance: state.rfInstance,
        stateLoadedFromUrl: state.stateLoadedFromUrl,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        onConnect: state.onConnect,
        onInit: state.onInit,
        updateStateLoadedFromUrl: state.updateStateLoadedFromUrl,
    }))

    useEffect(() => {
        if (rfInstance && !stateLoadedFromUrl) {
            // check for #state to prevent conflicts with supabase auth
            if (location.hash && location.hash.startsWith('#state')) {
                // Load state from URL
                const stateObject = queryString.parse(location.hash)
                const state = JSON.parse(
                    stateObject.state as string
                ) as ReactFlowJsonObject
                rfInstance.setNodes(state.nodes)
                rfInstance.setEdges(state.edges)
                rfInstance.setViewport(state.viewport)
            }
            updateStateLoadedFromUrl()
        }
    }, [rfInstance])

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Loading isLoading={!rfInstance} />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onInit={onInit}
            >
                <Auth />
                <ComponentSearchable />
                <Controls />
                <MiniMap />
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={12}
                    size={1}
                />
            </ReactFlow>
        </div>
    )
}
