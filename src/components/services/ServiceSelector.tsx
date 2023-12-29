import React from "react"
import { NodeTypes } from "reactflow"
import { useGamePlanStore } from "../../store"

type ServiceSelectorProps = {
    services: NodeTypes
}

export const ServiceSelector = ({ services }: ServiceSelectorProps) => {
    const addNode = useGamePlanStore(state => state.addNode);
    const [serviceKeys, setServicesKeys] = React.useState(Object.keys(services).sort());

    return (
        <div style={{
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
            width: 250,
        }}>
            <p style={{ margin: 0 }}>Components</p>
            <input style={{ margin: '10px 0', width: '100%' }} type="text" placeholder="🔎 Search" onChange={(e) => {
                const searchString = e.target.value.toLowerCase();
                if (searchString) {
                    setServicesKeys(serviceKeys.filter(key => key.toLowerCase().includes(e.target.value.toLowerCase())))
                } else {
                    setServicesKeys(Object.keys(services).sort())
                }
            }} />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'scroll',
            }}>
            {
                serviceKeys.map((key) =>
                    <button style={{ textAlign: 'left', margin: '1px 0' }} key={key} onClick={() => addNode(key)}>
                        +&nbsp;&nbsp;{key}
                    </button>
                )
            }
            </div>
        </div>
    )
}