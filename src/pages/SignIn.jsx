import { useState } from 'react'
import { SignInUser, CheckSession } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignIn = ({ setUser }) => {
  const initialState = { email: '', password: '' }

  const [formValues, setFormValues] = useState(initialState)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await SignInUser(formValues)
    // Immediately fetch session and normalize user
    const session = await CheckSession()
    const normalizedUser = session.user
      ? { ...session.user, _id: session.user._id || session.user.id }
      : null
    setFormValues(initialState)
    setUser(normalizedUser)
    navigate('/')
  }

  return (
    <div>
      <img src="https://i.imgur.com/clM1jkC.jpeg" alt="Sign In" />
      <form className="col" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="Email"
            value={formValues.email}
            required
            autoComplete="username"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            value={formValues.password}
            required
          />
        </div>
        <button disabled={!formValues.email || !formValues.password}>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignIn
