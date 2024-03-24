import React, { FormEventHandler, useCallback, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { Diagrams } from '../molecules/Diagrams'
import { useGamePlanStore } from '../../store'

/**
 * TODO: refactor into components
 */
export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(true)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const session = useGamePlanStore((state) => state.session)

    const toggle = useCallback(() => {
        setIsSignUp(!isSignUp)
    }, [isSignUp, setIsSignUp])

    const handleSignUp: FormEventHandler = async (event) => {
        event.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signUp({ email, password })

        if (error) alert(error.message)
        else alert('Check your email for the confirmation link!')

        setLoading(false)
    }

    const handleSignIn: FormEventHandler = async (event) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) alert(error.message)
        setLoading(false)
    }

    return (
        <div>
            {session ? (
                <div style={{ position: 'relative' }}>
                    <Diagrams user={session.user} />
                    <button
                        onClick={() => supabase.auth.signOut()}
                        title="Sign Out"
                        style={{ marginTop: 5, borderRadius: 5 }}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={isSignUp ? handleSignUp : handleSignIn}
                    style={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                    }}
                >
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div>
                        <button className={'button block'} disabled={loading}>
                            {loading ? (
                                <span>Loading</span>
                            ) : (
                                <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                            )}
                        </button>
                        &nbsp;or&nbsp;
                        <span
                            style={{
                                cursor: 'pointer',
                                color: 'blue',
                                textDecoration: 'underline',
                            }}
                            onClick={toggle}
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </span>
                    </div>
                </form>
            )}
        </div>
    )
}
