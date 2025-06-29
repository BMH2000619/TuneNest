import Client from './api'

export const SignInUser = async (data) => {
  const res = await Client.post('/auth/login', data)
  localStorage.setItem('token', res.data.token)
  console.log('JWT token in localStorage:', localStorage.getItem('token'))
  return res.data.user
}

export const RegisterUser = async (data) => {
  const res = await Client.post('/auth/register', data)
  return res.data
}

export const CheckSession = async () => {
  const res = await Client.get('/auth/session')
  console.log('Session data:', res.data)
  return res.data
}
