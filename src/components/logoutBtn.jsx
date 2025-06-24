import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { logout } from '../store/authSlice'

function LogoutBtn() {
    const dispatcher = useDispatch()
    const handleLogout = () => {
        authservice.logout().then(()=>{
            dispatcher(logout())
        })
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={handleLogout}>Logout</button>
  )
}

export default LogoutBtn