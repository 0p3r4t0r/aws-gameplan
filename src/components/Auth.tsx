import React, { FormEventHandler, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Session } from '@supabase/supabase-js'

/**
 * TODO handle signin and signup
 */
export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(true)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data?.session)
        })

        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session)
        })
    }, [])

    const handleSignUp: FormEventHandler = async (event) => {
        event.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            alert(error.message)
        } else {
            alert('Check your email for the login link!')
        }
        setLoading(false)
    }

    const handleSignIn: FormEventHandler = async (event) => {
        event.preventDefault()

        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            alert(error.message)
        } else {
            setSession(data?.session)
            alert('Welcome!')
        }
        setLoading(false)
    }

    return (
        <div style={{ position: 'absolute', top: 10, left: 20, zIndex: 100 }}>
            {session ? (
                <div>
                    <p>User ID: {session.user.id}</p>
                    <button
                        onClick={() => {
                            supabase.auth.signOut()
                        }}
                    >
                        Log out
                    </button>
                </div>
            ) : (
                <div className="row flex flex-center">
                    <div className="col-6 form-widget">
                        <p className="description">
                            (Optional) Sign in with your email or password
                            below.
                        </p>
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
                            </div>
                        </form>
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp)
                            }}
                        >
                            isSignUp: {isSignUp ? 'true' : 'false'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
