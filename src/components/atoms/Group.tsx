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
            <div className="group-delete-wrapper">
                <button
                    className="group-delete"
                    onClick={() => deleteNode(nodeId)}
                >
                    x
                </button>
            </div>
            <NodeResizer minHeight={32} minWidth={32} />
        </>
    )
}
