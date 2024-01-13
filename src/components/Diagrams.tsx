import React, { FormEventHandler, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Session } from '@supabase/supabase-js'
import { Database } from '../__generated__/database.types'
import queryString from 'query-string'
import { ReactFlowJsonObject } from 'reactflow'
import { useGamePlanStore } from '../store'

type Diagram = Database['public']['Tables']['diagrams']['Row']
type FormData = {
    name: string
}

export const Diagrams = () => {
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState<Session | null>(null)
    const [diagrams, setDiagrams] = useState<Diagram[]>([])
    const [formData, setFormState] = useState<FormData>({ name: '' })
    const rfInstance = useGamePlanStore((state) => state.rfInstance)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data?.session)
        })

        supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session)
        })
    }, [])

    useEffect(() => {
        if (session && session.user) {
            supabase
                .from('diagrams')
                .select('*')
                .eq('user_id', session.user.id)
                .then(({ data: diagrams, error }) => {
                    console.log('error', error)
                    console.log('diagrams', diagrams)
                    setDiagrams(diagrams!)
                    setLoading(false)
                })
        }
    }, [session])

    const saveDiagram: FormEventHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(session!.user!.id)
        await supabase.from('diagrams').insert({
            name: formData.name,
            state: window.location.hash,
            user_id: session!.user!.id,
        })
        setLoading(false)
    }

    const loadDiagram = (diagram: Diagram) => {
        console.log('load diagram', diagram)
        // TODO: refactor into store
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

    if (!session) return null

    return (
        <div>
            <ul>
                {diagrams.map((diagram) => (
                    <li key={diagram.name}>
                        <span
                            onClick={() => loadDiagram(diagram)}
                            style={{ cursor: 'pointer' }}
                        >
                            {diagram.name}{' '}
                        </span>
                        <button onClick={() => deleteDiagram(diagram)}>
                            delete
                        </button>
                    </li>
                ))}
            </ul>
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
        </div>
    )
}
