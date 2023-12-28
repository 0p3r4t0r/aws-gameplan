import React from "react"
import { NodeTypes } from "reactflow"
import { useGamePlanStore } from "../../store"

type ServiceSelectorProps = {
    services: NodeTypes
}

export const ServiceSelector = ({ services }: ServiceSelectorProps) => {
    const addNode = useGamePlanStore(state => state.addNode);

    return (
        <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 100, padding: 10, display: 'flex', flexDirection: 'column', border: 'solid black 1px', backgroundColor: 'white' }}>
            <p style={{ margin: 0 }}>Services</p>
            {
                Object.keys(services).sort().map((key) =>
                    <button key={key} onClick={() => addNode(key)}>
                        +&nbsp;{key}
                    </button>
                )
            }
        </div>
    )
}