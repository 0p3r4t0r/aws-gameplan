import React, { FormEventHandler, useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { Database } from '../../__generated__/database.types'
import { useGamePlanStore } from '../../store'
import { GamePlanIcons } from '../../__generated__/icons'
import { User } from '@supabase/supabase-js'
import { Icon } from './Icon'
import RipplesData from '../../assets/icons/ripples.svg'
import { Searchable, SearchableComponents } from './Searchable'
import { createWithEqualityFn } from 'zustand/traditional'

type Diagram = Database['public']['Tables']['diagrams']['Row']
type FormData = {
    name: string
}

type DiagramsState = {
    diagrams: Diagram[]
    setDiagrams: (diagrams: Diagram[]) => void
    updateDiagram: (diagram: Diagram, user: User) => Promise<void>
    deleteDiagram: (diagram: Diagram, user: User) => Promise<void>
}

const useDiagramsStore = createWithEqualityFn<DiagramsState>((set, get) => ({
    diagrams: [],
    setDiagrams: (diagrams) => set({ diagrams: [...diagrams] }),
    updateDiagram: async (diagram: Diagram, user: User) => {
        const { diagrams, setDiagrams } = get()

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
    },
    deleteDiagram: async (diagram: Diagram) => {
        const { diagrams, setDiagrams } = get()
        supabase
            .from('diagrams')
            .delete()
            .eq('id', diagram.id)
            .then(({ error }) => {
                if (!error) {
                    console.log('deleted: ', diagram.id)
                    setDiagrams(diagrams.filter((d) => d.id !== diagram.id))
                    console.log(diagrams.filter((d) => d.id !== diagram.id))
                }
            })
    },
}))

const DiagramFindable = ({ diagram }: { diagram: Diagram }) => {
    const [loading, setLoading] = useState(false)
    const user = useGamePlanStore((state) => state.session!.user)
    const loadStateFromUrlHash = useGamePlanStore(
        (state) => state.loadStateFromUrlHash
    )
    const updateDiagram = useDiagramsStore((state) => state.updateDiagram)
    const deleteDiagram = useDiagramsStore((state) => state.deleteDiagram)

    return (
        <div style={{ display: 'flex', gap: 10 }}>
            <div
                onClick={() => loadStateFromUrlHash(diagram.state)}
                style={{
                    flexGrow: 1,
                    cursor: 'pointer',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }}
            >
                {diagram.name}{' '}
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
                {loading ? (
                    'Loading...'
                ) : (
                    <>
                        <button
                            onClick={async () => {
                                setLoading(true)
                                await updateDiagram(diagram, user)
                                setLoading(false)
                            }}
                        >
                            💾
                        </button>
                        <button
                            onClick={async () => {
                                setLoading(true)
                                await deleteDiagram(diagram, user)
                                setLoading(false)
                            }}
                        >
                            ❌
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

type DiagramsProps = {
    user: User
}

export const Diagrams = ({ user }: DiagramsProps) => {
    const [initializing, setInitializing] = useState(true)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<FormData>({ name: '' })
    const diagrams = useDiagramsStore((state) => state.diagrams)
    const setDiagrams = useDiagramsStore((state) => state.setDiagrams)
    const components: SearchableComponents = diagrams.map((diagram) => ({
        id: diagram.name,
        findable: <DiagramFindable diagram={diagram} />,
    }))

    useEffect(() => {
        setInitializing(true)
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
                setInitializing(false)
            })
    }, [user])

    if (initializing) return <GamePlanIcons.Ripples />

    const saveDiagram: FormEventHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { data, error } = await supabase
            .from('diagrams')
            .insert({
                name: formData.name,
                state: window.location.hash,
                user_id: user.id,
            })
            .select()
        if (error) {
            alert(error.message)
        } else {
            setDiagrams([...diagrams, data[0]])
        }
        setLoading(false)
    }

    return (
        <div
            style={{
                backgroundColor: 'white',
                border: 'solid 1px black',
                borderRadius: 5,
                padding: 10,
            }}
        >
            <form
                className="form-widget"
                onSubmit={saveDiagram}
                style={{ display: 'flex', marginBottom: -2 }}
            >
                <input
                    // size={28} // TODO: Magic number
                    style={{ marginRight: 10, flexGrow: 1 }}
                    type="text"
                    placeholder="diagram name"
                    value={formData.name}
                    required={true}
                    onChange={(e) => setFormData({ name: e.target.value })}
                />
                {loading ? (
                    <Icon data={RipplesData} title="save" size={18} />
                ) : (
                    <button disabled={loading}>💾</button>
                )}
            </form>
            <Searchable components={components} />
        </div>
    )
}
