import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    img: null
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    const { id, value, files } = e.target
    if (id === 'img') {
      setFormValues({ ...formValues, img: files[0] })
    } else {
      setFormValues({ ...formValues, [id]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValues.password !== formValues.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const formData = new FormData()
    formData.append('username', formValues.username)
    formData.append('email', formValues.email)
    formData.append('password', formValues.password)
    if (formValues.img) {
      formData.append('img', formValues.img)
    }
    await RegisterUser(formData)
    setFormValues(initialState)
    navigate('/signin')
  }

  return (
    <div>
      <img src="/images/register.png" alt="Register" />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={handleChange}
            id="username"
            type="text"
            placeholder="John Doe"
            value={formValues.username}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="example@example.com"
            value={formValues.email}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            value={formValues.password}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="confirmPassword"
            value={formValues.confirmPassword}
            required
          />
        </div>
        <div>
          <label htmlFor="img">Profile Image (optional)</label>
          <input
            onChange={handleChange}
            type="file"
            id="img"
            accept="image/*"
          />
        </div>
        <button
          disabled={
            !formValues.email ||
            !formValues.password ||
            formValues.password !== formValues.confirmPassword
          }
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
