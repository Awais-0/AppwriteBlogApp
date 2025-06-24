import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate()
    const authstatus = useSelector((state) => state.auth.status)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // If auth is required but user is not authenticated
        if (authentication && !authstatus) {
            navigate('/login')
        }
        // If auth is not required but user is already authenticated
        else if (!authentication && authstatus) {
            navigate('/')
        } else {
            // All good, allow rendering
            setLoading(false)
        }
    }, [authstatus, authentication, navigate])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    return <>{children}</>
}