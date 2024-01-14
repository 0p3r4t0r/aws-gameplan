import React from 'react'
import { Icon } from './Icon'
import RipplesData from '../../assets/icons/ripples.svg'

type LoadingProps = {
    isLoading: boolean
}

export const Loading = ({ isLoading }: LoadingProps) => (
    <div
        style={{
            display: isLoading ? 'block' : 'none',
            position: 'fixed',
            zIndex: 999999999,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        }}
    >
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <Icon data={RipplesData} title="save" size={100} />
        </div>
    </div>
)
