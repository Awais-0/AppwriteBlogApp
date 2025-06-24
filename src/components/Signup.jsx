import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from './button'
import Input from './input'
import Logo from './logo'
import { login as authSlice } from '../store/authSlice'
import authservice from '../appwrite/auth'

function Signup() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm()

    const email = watch("email") // for confirmEmail match

    const signIn = async (data) => {
        setError("")
        const { name, email, password } = data
        try {
            const session = await authservice.createAccount({ name, email, password })
            if (session) {
                const userData = await authservice.getCurrentUser()
                if (userData) dispatch(authSlice(userData))
                navigate('/')
            }
        } catch (error) {
            setError("Error occurred: " + error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    {/* Logo */}
    <div className="flex justify-center mb-6">
      <Logo width="80px" />
    </div>

    {/* Headings */}
    <h2 className="text-2xl font-semibold text-center text-gray-800">Create an Account</h2>
    <p className="mt-1 text-center text-sm text-gray-500">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 hover:underline font-medium">
        Sign In
      </Link>
    </p>

    {/* Error Message */}
    {error && (
      <p className="mt-4 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
        {error}
      </p>
    )}

    {/* Form */}
    <form onSubmit={handleSubmit(signIn)} className="mt-6 space-y-5">
      {/* Username */}
      <div>
        <Input
          label="Username"
          placeholder="Enter your name"
          type="text"
          {...register("name", {
            required: "Username is required",
          })}
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
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
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      {/* Confirm Email */}
      <div>
        <Input
          label="Confirm Email"
          placeholder="Re-enter your email"
          type="email"
          {...register("confirmEmail", {
            required: "Please confirm your email",
            validate: (value) => value === email || "Emails do not match",
          })}
        />
        {errors.confirmEmail && <p className="text-sm text-red-500 mt-1">{errors.confirmEmail.message}</p>}
      </div>

      {/* Password */}
      <div>
        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
        Sign Up
      </Button>
    </form>
  </div>
</div>

  )
}

export default Signup;
