import React from "react"
import { NodeTypes } from "reactflow"

type ServiceSelectorProps = {
    services: NodeTypes
    nodes: any
    setNodes: Function
}
const initialNodes = [
  { id: '1', type: 'ec2', position: { x: 0, y: 0 }, data: { label: 'EC2' } },
  { id: '2', type: 'elb', position: { x: 0, y: 100 }, data: { label: 'ELB' } },
];

export const ServiceSelector = ({ services, nodes, setNodes }: ServiceSelectorProps) => {
    const handleClick = (key: String) => {
        const id = String(nodes.length + 1);
        const newNodes = [...nodes, { id: id, type: key, position: { x: 0, y: 0 }, data: { label: `${key}-${id}` } }];
        console.log(key, id, newNodes);
        setNodes(newNodes);
    }

    return (
        <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 100, padding: 10, display: 'flex', flexDirection: 'column', border: 'solid black 1px', backgroundColor: 'white' }}>
            <p style={{ margin: 0 }}>Services</p>
            {
                Object.keys(services).sort().map((key) =>
                    <button key={key} onClick={() => handleClick(key)}>
                        +&nbsp;{key}
                    </button>
                )
            }
        </div>
    )
}