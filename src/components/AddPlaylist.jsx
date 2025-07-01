import { useState } from 'react'
import { createPlaylist } from '../services/ShowPlaylists'

const AddPlaylist = ({ onAdd, user }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (!user) {
        setError('You must be signed in to create a playlist')
        setLoading(false)
        return
      }
      if (!title.trim()) {
        setError('Title is required')
        setLoading(false)
        return
      }
      const newPlaylist = await createPlaylist({
        title,
        description,
        isPublic
      })
      setTitle('')
      setDescription('')
      setIsPublic(true)
      if (onAdd) onAdd()
    } catch (err) {
      setError('Failed to create playlist')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="add-playlist-form" onSubmit={handleSubmit}>
      <h3>Create a Playlist</h3>
      <div>
        <input
          type="text"
          placeholder="Playlist Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div
        className="public-checkbox-row"
        style={{ justifyContent: 'flex-start', width: '100%' }}
      >
        <input
          type="checkbox"
          id="public-checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <label
          htmlFor="public-checkbox"
          style={{ marginLeft: 10, marginBottom: 0 }}
        >
          Public
        </label>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Playlist'}
      </button>
    </form>
  )
}

export default AddPlaylist
