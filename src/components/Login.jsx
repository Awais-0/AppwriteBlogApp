import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './button'
import Input from './input'
import Logo from './logo'
import { login as loginSlice } from '../store/authSlice'
import authservice from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
 
function Login() {
    const navigate = useNavigate()
    const dispatcher = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authservice.login(data)
            if(session) {
                const userData = await authservice.getCurrentUser()
                if(userData) dispatcher(loginSlice(userData))
                navigate('/')
            }
        } catch (error) {
            setError("Error occured: ", error.message)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    
    <div className="flex justify-center mb-6">
      <Logo width="80px" />
    </div>

    <h2 className="text-2xl font-semibold text-center text-gray-800">Sign in to your account</h2>
    <p className="mt-1 text-center text-sm text-gray-500">
      Don't have an account?{" "}
      <Link to="/signup" className="text-blue-600 hover:underline font-medium">
        Sign Up
      </Link>
    </p>

    {error && (
      <p className="mt-4 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
        {error}
      </p>
    )}

    <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        {...register("email", {
          required: "Email is required",
          validate: {
            matchPattern: (value) =>
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
              "Please enter a valid email address",
          },
        })}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        {...register("password", {
          required: "Password is required",
        })}
      />
      <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
        Sign In
      </Button>
    </form>
  </div>
</div>

  )
}

export default Login