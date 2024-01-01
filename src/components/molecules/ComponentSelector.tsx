import React, { useCallback, useState } from 'react'
import { useGamePlanStore } from '../../store'

// TODO: Break Camel Case so this is easier to read
const AwsServiceKey = ({
    serviceKey,
    characterWidth,
}: {
    serviceKey: string
    characterWidth: number
}) => {
    if (serviceKey.length <= characterWidth) {
        return <span>+&nbsp;&nbsp;{serviceKey}</span>
    }
    return (
        <span>
            +&nbsp;&nbsp;{serviceKey.substring(0, characterWidth)}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            {serviceKey.substring(characterWidth, serviceKey.length)}
        </span>
    )
}

export const ComponentSelector = () => {
    const characterWidth = 15
    const nodeTypes = useGamePlanStore((state) => state.nodeTypes)
    const addNode = useGamePlanStore((state) => state.addNode)

    const [sortedKeys] = useState(Object.keys(nodeTypes).sort())
    const [serviceKeys, setServicesKeys] = useState(
        Object.keys(nodeTypes).sort()
    )

    const normalize = useCallback((s: string) => {
        const lowerCase = s.toLowerCase()
        const noSpaces = lowerCase.replace(/\s/g, '')
        return noSpaces
    }, [])

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
                height: 400,
                width: `${characterWidth}em`,
            }}
        >
            <p style={{ margin: 0 }}>Components</p>
            <input
                style={{ margin: '10px 0', width: '100%' }}
                type="text"
                placeholder="🔎 Search"
                onChange={(e) => {
                    const searchString = normalize(e.target.value)
                    if (searchString) {
                        setServicesKeys(
                            sortedKeys.filter((key) =>
                                normalize(key).includes(searchString)
                            )
                        )
                    } else {
                        setServicesKeys(sortedKeys)
                    }
                }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'scroll',
                }}
            >
                {serviceKeys.map((key) => (
                    <button
                        style={{
                            textAlign: 'left',
                            margin: '1px 0',
                            padding: '0 4px',
                            textWrap: 'balance',
                        }}
                        key={key}
                        onClick={() => addNode(key)}
                    >
                        <AwsServiceKey serviceKey={key} characterWidth={27} />
                    </button>
                ))}
            </div>
        </div>
    )
}
