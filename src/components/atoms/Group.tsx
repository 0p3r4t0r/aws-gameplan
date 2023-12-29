import React from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

type GroupNodeProps = {
    data: string;
    title: string;
}

// https://reactflow.dev/learn/layouting/sub-flows
// https://reactflow.dev/examples/nodes/resize-rotate
export const GroupNode = ({ data, title }: GroupNodeProps) => {
    return (
        <div style={{width: 360, height: 360}}>
            <img alt={title} src={data} title={title} width="32" height="32" />
            <NodeResizer minHeight={32} minWidth={32} />
        </div>
    )
}