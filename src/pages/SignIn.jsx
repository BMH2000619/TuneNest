import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()
  // 'identifier' can be email or username
  const initialState = { identifier: '', password: '' } 

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues(initialState)
    setUser(payload)
    navigate('/feed')
  }

  return (
    <div>
      <img src="/images/signin.png" alt="Sign In" />
      <form className="col" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="identifier">Email or Username</label>
          <input
            onChange={handleChange}
            id="identifier"
            type="text"
            placeholder="Email or Username"
            value={formValues.identifier}
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
        <button disabled={!formValues.identifier || !formValues.password}>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignIn
