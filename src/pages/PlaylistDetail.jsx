import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  getplaylistById,
  updatePlaylist,
  deletePlaylist
} from '../services/ShowPlaylists'
import { getAllSongs } from '../services/ShowSongs'

const PlaylistDetail = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    isPublic: true
  })
  const [error, setError] = useState('')
  const [allSongs, setAllSongs] = useState([])
  const [selectedSongId, setSelectedSongId] = useState('')

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getplaylistById(id)
        setPlaylist(data)
        setForm({
          title: data.title,
          description: data.description,
          isPublic: data.isPublic
        })
      } catch (err) {
        setError('Failed to load playlist.')
      } finally {
        setLoading(false)
      }
    }
    fetchPlaylist()
  }, [id])

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getAllSongs()
        setAllSongs(songs)
      } catch (err) {
        setError('Failed to load songs.')
      }
    }
    fetchSongs()
  }, [])

  const isOwner =
    user && playlist && String(user._id) === String(playlist.createdBy?._id)

  const handleEdit = () => setEditMode(true)
  const handleCancel = () => setEditMode(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await updatePlaylist(id, form)
      const updated = await getplaylistById(id)
      setPlaylist(updated)
      setEditMode(false)
    } catch (err) {
      setError('Failed to update playlist.')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Delete this playlist?')) {
      await deletePlaylist(id)
      navigate('/playlists')
    }
  }

  // Add existing song to playlist
  const handleAddSong = async (e) => {
    e.preventDefault()
    if (!selectedSongId) return
    try {
      // Add the selected song's ID to the playlist's songs array
      const updatedSongs = [...(playlist.songs || []), selectedSongId]
      await updatePlaylist(id, { ...form, songs: updatedSongs })
      const updated = await getplaylistById(id)
      setPlaylist(updated)
      setSelectedSongId('')
    } catch (err) {
      setError('Failed to add song.')
    }
  }

  // Filter out songs already in the playlist
  const availableSongs = allSongs.filter(
    (song) => !playlist?.songs?.some((s) => s._id === song._id)
  )

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }
  if (!playlist) {
    return <div>Playlist not found.</div>
  }

  return (
    <div className="playlist-detail-container">
      {editMode ? (
        <form onSubmit={handleSave} style={{ marginBottom: 24 }}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <label>
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
            />
            Public
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="playlist-detail-header">
            <h2>{playlist.title}</h2>
            <p>{playlist.description}</p>
            <div className="playlist-detail-meta">
              <span className="playlist-owner">
                By: {playlist.createdBy?.username || 'Unknown'}
              </span>
              <span
                className={
                  'playlist-privacy ' +
                  (playlist.isPublic ? 'public' : 'private')
                }
              >
                {playlist.isPublic ? 'Public' : 'Private'}
              </span>
            </div>
          </div>
          {isOwner && (
            <div className="playlist-detail-actions">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      )}

      <div className="playlist-songs-section">
        <h3>Songs</h3>
        {playlist.songs && playlist.songs.length > 0 ? (
          <ul className="song-list">
            {playlist.songs.map((song) => (
              <li key={song._id} className="song-list-item">
                <Link
                  to={`/songs/${song._id}`}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    width: '100%',
                    display: 'block'
                  }}
                >
                  <strong>{song.title}</strong> by {song.artist}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>No songs in this playlist.</div>
        )}
      </div>

      {isOwner && (
        <form onSubmit={handleAddSong} className="add-song-form">
          <h4>Add Song from Library</h4>
          <select
            value={selectedSongId}
            onChange={(e) => setSelectedSongId(e.target.value)}
            required
          >
            <option value="">Select a song...</option>
            {availableSongs.map((song) => (
              <option key={song._id} value={song._id}>
                {song.title} by {song.artist}
              </option>
            ))}
          </select>
          <button type="submit" disabled={!selectedSongId}>
            Add Song
          </button>
        </form>
      )}
    </div>
  )
}

export default PlaylistDetail
