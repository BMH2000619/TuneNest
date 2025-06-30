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
import Songs from './pages/Songs'
import SongDetail from './pages/SongDetail'

const App = () => {
  const [user, setUser] = useState(null)
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      Client.defaults.headers.common['Authorization'] = `Bearer ${token}`
      CheckSession()
        .then((data) => {
          const normalizedUser = data.user
            ? { ...data.user, _id: data.user._id || data.user.id }
            : null
          setUser(normalizedUser)
          setUserLoading(false)
        })
        .catch(() => {
          setUser(null)
          setUserLoading(false)
          localStorage.removeItem('token')
          delete Client.defaults.headers.common['Authorization']
        })
    } else {
      setUserLoading(false)
    }
  }, [])

  return (
    <>
      <Nav user={user} setUser={setUser} />
      {userLoading ? (
        <div
          style={{ textAlign: 'center', marginTop: '3rem', color: '#1db954' }}
        >
          Loading...
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/songs" element={<Songs user={user} />} />
          <Route
            path="/songs/:id"
            element={<SongDetail user={user} userLoading={userLoading} />}
          />
        </Routes>
      )}
    </>
  )
}

export default App
