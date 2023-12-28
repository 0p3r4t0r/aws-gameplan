import React from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

type GroupNodeProps = {
    data: string;
    alt: string;
    title: string;
}

// https://reactflow.dev/learn/layouting/sub-flows
// https://reactflow.dev/examples/nodes/resize-rotate
export const GroupNode = ({ alt, data, title }: GroupNodeProps) => {
    return (
        <div style={{width: 360, height: 360}}>
            <img src={data} alt={alt} title={title} width="32" height="32" />
            <NodeResizer minHeight={100} minWidth={100} />
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}