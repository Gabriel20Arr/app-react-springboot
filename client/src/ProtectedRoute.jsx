import React from 'react'
import { useAuthContext } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuthContext()

    if(isAuthenticated) return <Navigate to="/login" replace />
    if(loading) {
        return <h1 className="text-4xl text-red-500 w-full text-center">Loading..</h1>
    }
    
    return <Outlet />
}

export default ProtectedRoute;