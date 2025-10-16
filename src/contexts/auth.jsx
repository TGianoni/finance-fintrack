import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useLogin, useSignup } from '@/api/hooks/user'
import { UserService } from '@/api/services/user'
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

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
  const signUpMutation = useSignup()

  const loginPageMutation = useLogin()

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
  const signup = async (data) => {
    try {
      const createdUser = await signUpMutation.mutateAsync(data)
      setUser(createdUser)
      setTokens(createdUser.tokens)
      toast.success('Conta criada com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar conta. Por favor, tente novamente mais tarde')
    }
  }
  const login = async (data) => {
    try {
      const loginUser = await loginPageMutation.mutateAsync(data)
      setUser(loginUser)
      setTokens(loginUser.tokens)
      toast.success(`Bem-vindo de volta, ${loginUser.firstName}!`)
    } catch (error) {
      console.error(error)
      toast.error(
        'Erro ao realizar o login. Por favor, verifique suas credenciais.'
      )
    }
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
