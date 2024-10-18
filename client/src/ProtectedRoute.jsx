import React from 'react'
import { useAuthContext } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isAuthtenticated, loading } = useAuthContext()
    
    if(loading) {
        return <h1 className="text-4xl text-red-500 w-full text-center">Loading..</h1>
    }

    // console.log(loading, isAuthenticated);
    if(loading) return <div className="loading">
        <h1 className="text-4xl text-red-500 w-full text-center">Loading..</h1>
     </div>
     
    if(!loading && !isAuthtenticated) return <Navigate to={'/login'} replace />
    
    return <Outlet />
}

export default ProtectedRoute;