import { Navigate } from 'react-router'

import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()
  if (isInitializing) {
    return null
  }
  if (!user) {
    return <Navigate to="/login" />
  }
}

export default HomePage
