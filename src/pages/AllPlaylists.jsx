import { useEffect, useState } from 'react'
import { getAllPublicPlaylists } from '../services/ShowPlaylists'
import AddPlaylist from '../components/AddPlaylist'
import { useNavigate } from 'react-router-dom'

const AllPlaylists = ({ user }) => {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getAllPublicPlaylists()
        setPlaylists(data)
      } catch (err) {
        console.error('Failed to fetch playlists:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPlaylists()
  }, [])

  const handleAdd = async () => {
    setLoading(true)
    try {
      const data = await getAllPublicPlaylists()
      setPlaylists(data)
    } catch (err) {
      console.error('Failed to fetch playlists:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        Loading playlists ...
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>All Public Playlists</h2>
      <AddPlaylist onAdd={handleAdd} user={user} />
      {playlists.length === 0 ? (
        <div>No playlists found.</div>
      ) : (
        <div>
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="playlist-card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/playlists/${playlist._id}`)}
            >
              {playlist.coverImg && (
                <img
                  src={`http://localhost:3001/${playlist.coverImg}`}
                  alt={playlist.title}
                  className="playlist-cover"
                />
              )}
              <div className="playlist-info">
                <h3 style={{ margin: 0 }}>{playlist.title}</h3>
                <p style={{ margin: '4px 0' }}>{playlist.description}</p>
                <div className="playlist-meta">
                  <span
                    className={`playlist-badge ${
                      playlist.isPublic ? 'public' : 'private'
                    }`}
                  >
                    {playlist.isPublic ? 'Public' : 'Private'}
                  </span>
                  <span className="playlist-by">
                    By: {playlist.createdBy?.username || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllPlaylists
