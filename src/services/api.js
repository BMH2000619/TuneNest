import axios from 'axios'

const Client = axios.create({ baseURL: 'http://localhost:3001/' })

Client.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    console.log({ msg: 'Axios Interceptor Error!', error })
    throw error
  }
)

export default Client
