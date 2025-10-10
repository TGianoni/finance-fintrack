import axios from 'axios'

const RENDER_URL = 'https://fullstackclub-finance-dashboard-api.onrender.com'

export const api = axios.create({
  baseURL: RENDER_URL + '/api',
})
