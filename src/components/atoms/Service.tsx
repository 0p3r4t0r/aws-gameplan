import React from 'react'
import { Handle, Position } from 'reactflow'

type ServiceNodeProps = {
    data: string
    title: string
}

export const ServiceNode = ({ data, title }: ServiceNodeProps) => {
    return (
        <>
            <Handle type="target" position={Position.Top} />
            <img alt={title} src={data} title={title} width="64" height="64" />
            <Handle type="source" position={Position.Bottom} />
        </>
    )
}
