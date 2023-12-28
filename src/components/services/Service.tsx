import React from 'react';
import { Handle, Position } from 'reactflow';

type ServiceNodeProps = {
    data: string;
    alt: string;
}

export const ServiceNode = ({ data, alt }: ServiceNodeProps) => {
    return (
        <>
            <Handle type="target" position={Position.Top} />
            <img src={data} alt={alt} width="64" height="64" />
            <Handle type="source" position={Position.Bottom} />
        </>
    )
}