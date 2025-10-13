import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'
import { UserService } from '@/services/user'

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isInitializing, setIsInitializing] = useState(true)
  const signUpMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await UserService.signUp(variables)
      return response
    },
  })
  const loginPageMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await UserService.login(variables)
      return response
    },
  })

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )
        if (!accessToken && !refreshToken) return
        const response = await UserService.me()
        setUser(response)
      } catch (error) {
        setUser(null)
        console.error(error)
      } finally {
        setIsInitializing(false)
      }
    }
    init()
  }, [])
  const signup = (data) => {
    signUpMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser)
        setTokens(createdUser.tokens)
        toast.success('Conta criada com sucesso')
      },
      onError: () => {
        toast.error(
          'Erro ao criar conta. Por favor, tente novamente mais tarde'
        )
      },
    })
  }
  const login = (data) => {
    loginPageMutation.mutate(data, {
      onSuccess: (loginUser) => {
        setUser(loginUser)
        setTokens(loginUser.tokens)
        toast.success(`Bem-vindo de volta, ${loginUser.firstName}!`)
      },
      onError: () => {
        toast.error(
          'Erro ao fazer login. Por favor, tente novamente mais tarde'
        )
      },
    })
  }

  const signOut = () => {
    setUser(null)
    removeTokens()
  }
  return (
    <AuthContext.Provider
      value={{
        user: user,
        isInitializing: isInitializing,
        login: login,
        signup: signup,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
