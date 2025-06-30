import './App.css'
import Nav from './components/Nav'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Client from './services/api'
import { CheckSession } from './services/Auth'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      Client.defaults.headers.common['Authorization'] = `Bearer ${token}`
      CheckSession()
        .then((data) => setUser(data.user))
        .catch(() => setUser(null))
    }
  }, [])

  return (
    <>
      <Nav user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
