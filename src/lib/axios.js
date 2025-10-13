import axios from 'axios'

import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/constants/local-storage'

const RENDER_URL = 'https://fullstackclub-finance-dashboard-api.onrender.com'

export const protectedApi = axios.create({
  baseURL: RENDER_URL + '/api',
})

export const publicApi = axios.create({
  baseURL: RENDER_URL + '/api',
})

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  if (!accessToken) {
    return request
  }
  console.log('Colocando access Token na request')
  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})
