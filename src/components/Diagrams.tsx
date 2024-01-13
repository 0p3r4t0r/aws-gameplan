import React, { FormEventHandler, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Database } from '../__generated__/database.types'
import queryString from 'query-string'
import { ReactFlowJsonObject } from 'reactflow'
import { useGamePlanStore } from '../store'
import { GamePlanIcons } from '../__generated__/icons'
import { User } from '@supabase/supabase-js'

type Diagram = Database['public']['Tables']['diagrams']['Row']
type FormData = {
    name: string
}
type DiagramsProps = {
    user: User
}

export const Diagrams = ({ user }: DiagramsProps) => {
    const [loading, setLoading] = useState(false)
    const [diagrams, setDiagrams] = useState<Diagram[]>([])
    const [formData, setFormState] = useState<FormData>({ name: '' })
    const rfInstance = useGamePlanStore((state) => state.rfInstance)

    useEffect(() => {
        if (user) {
            supabase
                .from('diagrams')
                .select()
                .eq('user_id', user.id)
                .then(({ data: diagrams, error }) => {
                    if (error) {
                        console.error(error)
                    } else if (diagrams.length) {
                        setDiagrams(diagrams)
                    }
                })
        }
    }, [])

    const saveDiagram: FormEventHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { data } = await supabase
            .from('diagrams')
            .insert({
                name: formData.name,
                state: window.location.hash,
                user_id: user.id,
            })
            .select()
        if (data) {
            setDiagrams([...diagrams, data[0]])
        }
        setLoading(false)
    }

    const updateDiagram = async (diagram: Diagram) => {
        setLoading(true)
        console.log(user.id)
        const { status } = await supabase
            .from('diagrams')
            .upsert({
                id: diagram.id,
                name: diagram.name,
                state: window.location.hash,
                user_id: user.id,
            })
            .single()
        if (status === 200) {
            setDiagrams(
                diagrams.map((d) =>
                    d.id === diagram.id
                        ? { ...diagram, state: window.location.hash }
                        : d
                )
            )
        }
        setLoading(false)
    }

    const loadDiagram = (diagram: Diagram) => {
        if (rfInstance) {
            const stateObject = queryString.parse(diagram.state)
            const state = JSON.parse(
                stateObject.state as string
            ) as ReactFlowJsonObject
            rfInstance.setNodes(state.nodes)
            rfInstance.setEdges(state.edges)
            rfInstance.setViewport(state.viewport)
        }
    }

    const deleteDiagram = async (diagram: Diagram) => {
        console.log('delete diagram', diagram)
        supabase
            .from('diagrams')
            .delete()
            .eq('id', diagram.id)
            .then(({ error }) => {
                if (!error)
                    setDiagrams(diagrams.filter((d) => d.id !== diagram.id))
            })
    }

    return (
        <div>
            <form className="form-widget" onSubmit={saveDiagram}>
                <div>
                    <input
                        className="inputField"
                        type="text"
                        placeholder="diagram name"
                        value={formData.name}
                        required={true}
                        onChange={(e) => setFormState({ name: e.target.value })}
                    />
                </div>
                <div>
                    <button className={'button block'} disabled={loading}>
                        {loading ? <span>Loading</span> : <span>Save</span>}
                    </button>
                </div>
            </form>
            <ul>
                {diagrams.map((diagram) => (
                    <li key={diagram.name} style={{ display: 'flex', gap: 5 }}>
                        <div
                            onClick={() => loadDiagram(diagram)}
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {diagram.name}{' '}
                        </div>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => updateDiagram(diagram)}
                        >
                            <GamePlanIcons.Save />
                        </div>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => deleteDiagram(diagram)}
                        >
                            <GamePlanIcons.Delete />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
