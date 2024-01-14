import React from 'react'
import { GamePlanIcons } from '../../__generated__/icons'

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
            <GamePlanIcons.Ripples />
        </div>
    </div>
)
