import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllPublicPlaylists } from '../services/ShowPlaylists'

const Profile = ({ user, userLoading, setUser }) => {
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ username: '', img: null })
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && user.username) {
      setForm({ username: user.username, img: null })
    }
  }, [user])

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const all = await getAllPublicPlaylists()
        setPlaylists(
          all.filter(
            (p) =>
              String(p.createdBy?._id || p.createdBy?.id) ===
              String(user._id || user.id)
          )
        )
      } catch (err) {
        setError('Failed to load playlists.')
      } finally {
        setLoading(false)
      }
    }
    if (user?._id || user?.id) {
      fetchPlaylists()
    }
  }, [user])

  const handleEdit = () => setEditMode(true)
  const handleCancel = () => {
    setEditMode(false)
    setForm({ username: user.username, img: null })
  }

  const handleChange = (e) => {
    if (e.target.name === 'img') {
      setForm({ ...form, img: e.target.files[0] })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('username', form.username)
      if (form.img) formData.append('img', form.img)
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:3001/auth/update/${user._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to update profile.')
      setEditMode(false)
      setUser((prev) => ({ ...prev, ...data }))
    } catch (err) {
      setError('Failed to update profile.')
    }
  }

  if (userLoading || loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!user) return <div>User not found.</div>

  return (
    <div
      className="profile-container"
      style={{ maxWidth: 500, margin: '2rem auto' }}
    >
      <h2>Profile</h2>
      <div className="profile-info" style={{ marginBottom: 24 }}>
        <img
          src={
            user.img
              ? `http://localhost:3001/${user.img.replace(/^public[\\/]/, '')}`
              : '/default-profile.png'
          }
          alt="Profile"
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: 12
          }}
        />
        {editMode ? (
          <form
            onSubmit={handleSave}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Username"
            />
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleChange}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <button onClick={handleEdit} style={{ marginTop: 12 }}>
              Edit Profile
            </button>
          </>
        )}
      </div>
      <div className="profile-playlists">
        <h3>Your Playlists</h3>
        {playlists.length === 0 ? (
          <div>You haven't created any playlists yet.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {playlists.map((playlist) => (
              <li key={playlist._id} style={{ marginBottom: 8 }}>
                <Link
                  to={`/playlists/${playlist._id}`}
                  style={{
                    display: 'block',
                    padding: '0.5em 0',
                    color: '#1db954',
                    textDecoration: 'none'
                  }}
                >
                  <strong>{playlist.title}</strong>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Profile
