import React, { FormEventHandler, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Session } from '@supabase/supabase-js'

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data?.session)
        })

        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session)
        })
    }, [])

    const handleLogin: FormEventHandler = async (event) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({ email })

        if (error) {
            alert(error.message)
        } else {
            alert('Check your email for the login link!')
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
                            (Optional) Sign in via magic link with your email
                            below
                        </p>
                        <form className="form-widget" onSubmit={handleLogin}>
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
                                <button
                                    className={'button block'}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span>Loading</span>
                                    ) : (
                                        <span>Send magic link</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
