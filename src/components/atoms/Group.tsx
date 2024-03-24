import React from 'react'
import { NodeProps, NodeResizer, useNodeId } from 'reactflow'
import { useGamePlanStore } from '../../store'

type GroupNodeProps = {
    imgSrc: string
    title: string
    data: NodeProps['data']
}

// https://reactflow.dev/learn/layouting/sub-flows
// https://reactflow.dev/examples/nodes/resize-rotate
// https://stackoverflow.com/questions/73508204/custom-nodes-in-react-flow-saving-additional-data-to-a-node-after-it-has-been-c
export const GroupNode = ({ imgSrc, title, data }: GroupNodeProps) => {
    const id = useNodeId()!;
    const editNodeData = useGamePlanStore((state) => state.editNodeData)
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <img
                    className="group-drag-handle"
                    style={{ outline: 'none', }}
                    alt={title}
                    src={imgSrc}
                    title={title}
                    width="32"
                    height="32" />
                <input 
                    className="group-enable-pointer-events" 
                    style={{ flexGrow: 1, marginRight: 5, height: 24, fontSize: 20 }}
                    name="text"
                    value={data.text}
                    onChange={(e) => {
                        editNodeData(id, { text: e.target.value })
                    }}
                />
            </div>
            <NodeResizer minHeight={32} minWidth={32} />
        </>
    )
}
