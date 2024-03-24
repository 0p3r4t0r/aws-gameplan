import React from 'react'

type IconProps = {
    imgSrc: string
    title: string
    size?: number
}

export const Icon = ({ imgSrc, title, size = 32 }: IconProps) => (
    <img alt={title} src={imgSrc} title={title} width={size} height={size} />
)
