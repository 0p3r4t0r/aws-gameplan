import React from 'react'
import { useGamePlanStore } from '../../store'
import { Searchable, SearchableComponents } from '../atoms/Searchable'

// TODO: Break Camel Case so this is easier to read
const AwsServiceFindable = ({ nodeKey }: { nodeKey: string }) => {
    const addNode = useGamePlanStore((state) => state.addNode)
    const maxCharacterWidth = 27
    return (
        <button
            style={{
                textAlign: 'left',
                margin: '1px 0',
                padding: '0 4px',
                textWrap: 'balance',
                width: '100%',
            }}
            onClick={() => addNode(nodeKey)}
        >
            {nodeKey.length <= maxCharacterWidth ? (
                <span>+&nbsp;&nbsp;{nodeKey}</span>
            ) : (
                <span>
                    +&nbsp;&nbsp;{nodeKey.substring(0, maxCharacterWidth)}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {nodeKey.substring(maxCharacterWidth, nodeKey.length)}
                </span>
            )}
        </button>
    )
}

export const ComponentSearchable = () => {
    const nodeTypes = useGamePlanStore((state) => state.nodeTypes)
    const sortedKeys = Object.keys(nodeTypes).sort()
    const components: SearchableComponents = sortedKeys.map((key) => ({
        id: key,
        findable: <AwsServiceFindable nodeKey={key} />,
    }))

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                zIndex: 100,
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                border: 'solid grey 1px',
                borderRadius: 5,
                backgroundColor: 'white',
                width: '15em', // TODO: Magic number
            }}
        >
            <p style={{ margin: 0 }}>Components</p>
            <Searchable components={components} />
        </div>
    )
}
