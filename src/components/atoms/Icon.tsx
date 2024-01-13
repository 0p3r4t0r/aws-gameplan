import React from 'react'

type IconProps = {
    data: string
    title: string
    size?: number
}

export const Icon = ({ data, title, size = 32 }: IconProps) => (
    <img alt={title} src={data} title={title} width={size} height={size} />
)
