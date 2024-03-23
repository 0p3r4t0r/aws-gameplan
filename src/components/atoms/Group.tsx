import React from 'react'
import { NodeResizer } from 'reactflow'

type GroupNodeProps = {
    data: string
    title: string
}

// https://reactflow.dev/learn/layouting/sub-flows
// https://reactflow.dev/examples/nodes/resize-rotate
export const GroupNode = ({ data, title }: GroupNodeProps) => (
    <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <img
                className="group-drag-handle"
                style={{ outline: 'none', }}
                alt={title}
                src={data}
                title={title}
                width="32"
                height="32"
            />
            <input className="group-enable-pointer-events" style={{ flexGrow: 1, marginRight: 5, height: 24, fontSize: 20 }} type="text" />
        </div>
        <NodeResizer minHeight={32} minWidth={32} />
    </>
)
