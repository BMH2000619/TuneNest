import { Link } from 'react-router-dom'
import api from '../services/api'

const Nav = ({ user, setUser }) => {
  const handleSignOut = () => {
    setUser(null)
    localStorage.removeItem('token')
    delete window.localStorage.token
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/about">About</Link>
      </div>
      <div>
        <Link to="/songs">Songs</Link>
      </div>
      {!user ? (
        <>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/signin">Sign in</Link>
          </div>
        </>
      ) : (
        <div>
          <button
            onClick={handleSignOut}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  )
}

export default Nav
