import React from 'react'
import { Handle, Position } from 'reactflow'

type ServiceNodeProps = {
    imgSrc: string
    title: string
}

export const ServiceNode = ({ imgSrc, title }: ServiceNodeProps) => (
    <>
        <Handle type="target" position={Position.Top} />
        <img alt={title} src={imgSrc} title={title} width="64" height="64" />
        <Handle type="source" position={Position.Bottom} />
    </>
)
