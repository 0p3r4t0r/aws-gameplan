import React, { useCallback } from 'react'
import { NodeResizer } from 'reactflow'

type GroupNodeProps = {
    imgSrc: string
    title: string
    text?: string
}

// https://reactflow.dev/learn/layouting/sub-flows
// https://reactflow.dev/examples/nodes/resize-rotate
export const GroupNode = ({ imgSrc, title, text="" }: GroupNodeProps) => {
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
                    type="text"
                    value={text}
                />
            </div>
            <NodeResizer minHeight={32} minWidth={32} />
        </>
    )
}
