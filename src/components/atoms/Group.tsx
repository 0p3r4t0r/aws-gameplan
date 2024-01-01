import React from 'react'
import { NodeResizer, useNodeId } from 'reactflow'
import { useGamePlanStore } from '../../store'

type GroupNodeProps = {
    data: string
    title: string
}

// https://reactflow.dev/learn/layouting/sub-flows
// https://reactflow.dev/examples/nodes/resize-rotate
export const GroupNode = ({ data, title }: GroupNodeProps) => {
    const deleteNode = useGamePlanStore((state) => state.deleteNode)
    const nodeId = useNodeId()!

    return (
        <>
            <img
                className="group-drag-handle"
                alt={title}
                src={data}
                title={title}
                width="32"
                height="32"
            />
            <button
                onClick={() => deleteNode(nodeId)}
                style={{ position: 'absolute', top: 0, right: 0 }}
            >
                x
            </button>
            <NodeResizer minHeight={32} minWidth={32} />
        </>
    )
}
