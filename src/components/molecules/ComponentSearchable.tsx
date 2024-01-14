import React from 'react'
import { useGamePlanStore } from '../../store'
import { Searchable, SearchableComponents } from '../atoms/Searchable'

// TODO: Break Camel Case so this is easier to read
const AwsServiceFindable = ({ nodeKey }: { nodeKey: string }) => {
    const addNode = useGamePlanStore((state) => state.addNode)
    return (
        <button
            style={{
                textAlign: 'left',
                margin: '1px 0',
                padding: '0 4px',
                textWrap: 'balance',
                display: 'flex',
                width: '100%',
            }}
            onClick={() => addNode(nodeKey)}
        >
            <div style={{ marginRight: 2 }}>+</div>
            <div style={{ flexGrow: 1, wordBreak: 'break-all' }}>{nodeKey}</div>
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
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                border: 'solid grey 1px',
                borderRadius: 5,
                backgroundColor: 'white',
            }}
        >
            <p style={{ margin: 0 }}>Components</p>
            <Searchable components={components} />
        </div>
    )
}
