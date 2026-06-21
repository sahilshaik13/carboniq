'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

interface User {
  email: string
  full_name?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('carboniq_token')
    if (savedToken) {
      setToken(savedToken)
      // Verify token is still valid
      verifyToken(savedToken)
    }
    setIsLoading(false)
  }, [])

  const verifyToken = async (token: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/verify`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (response.data.valid) {
        setUser({ email: response.data.user })
      }
    } catch (error) {
      localStorage.removeItem('carboniq_token')
      setToken(null)
      setUser(null)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/login`,
        { email, password }
      )
      const { access_token } = response.data
      setToken(access_token)
      localStorage.setItem('carboniq_token', access_token)
      setUser({ email })
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  const register = async (email: string, password: string, fullName: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/register`,
        { email, password, full_name: fullName }
      )
      const { access_token } = response.data
      setToken(access_token)
      localStorage.setItem('carboniq_token', access_token)
      setUser({ email, full_name: fullName })
    } catch (error) {
      throw new Error('Registration failed')
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('carboniq_token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
