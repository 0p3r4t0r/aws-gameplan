import React, { FormEventHandler, useCallback, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { Diagrams } from '../atoms/Diagrams'
import { useGamePlanStore } from '../../store'
import { GamePlanIcons } from '../../__generated__/icons'

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
        <div style={{ position: 'absolute', top: 10, left: 20, zIndex: 100 }}>
            {session ? (
                <div>
                    <div>
                        <GamePlanIcons.UserHeart />
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => supabase.auth.signOut()}
                        >
                            <GamePlanIcons.SignOut />
                        </span>
                    </div>
                    <Diagrams user={session.user} />
                </div>
            ) : (
                <div className="row flex flex-center">
                    <div className="col-6 form-widget">
                        <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                        <form
                            className="form-widget"
                            onSubmit={isSignUp ? handleSignUp : handleSignIn}
                        >
                            <div>
                                <input
                                    className="inputField"
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    className="inputField"
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    required={true}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <button
                                    className={'button block'}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span>Loading</span>
                                    ) : (
                                        <span>Go!</span>
                                    )}
                                </button>
                                &nbsp; or{' '}
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
                    </div>
                </div>
            )}
        </div>
    )
}
