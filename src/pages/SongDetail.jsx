import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSongById, deleteSong, updateSong } from '../services/ShowSongs'

const SongDetail = ({ user, userLoading }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [song, setSong] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({
    title: '',
    artist: '',
    url: '',
    duration: ''
  })

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await getSongById(id)
        setSong(data)
        setForm({
          title: data.title,
          artist: data.artist,
          url: data.url,
          duration: data.duration
        })
      } catch (err) {
        setError('Failed to load song.')
      } finally {
        setLoading(false)
      }
    }
    fetchSong()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      await deleteSong(id)
      navigate('/songs')
    }
  }

  const handleEdit = () => setEditMode(true)
  const handleCancel = () => setEditMode(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await updateSong(id, form)
      const updatedSong = await getSongById(id)
      setSong(updatedSong)
      setEditMode(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update song.')
    }
  }

  if (loading || userLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!song) return <div>Song not found.</div>

  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
    )
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
  }

  const isOwner = user && String(user._id) === String(song.addedBy?._id)

  return (
    <div className="song-detail-container">
      <div className="song-detail-video">
        <iframe
          width="560"
          height="315"
          src={getYouTubeEmbedUrl(editMode ? form.url : song.url)}
          title={editMode ? form.title : song.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="song-detail-info">
        {editMode ? (
          <form
            onSubmit={handleSave}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
            <input
              type="text"
              name="artist"
              value={form.artist}
              onChange={handleChange}
              placeholder="Artist"
              required
            />
            <input
              type="text"
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="YouTube URL"
              required
            />
            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="Duration"
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2>{song.title}</h2>
            <p>Artist: {song.artist}</p>
            <p>Duration: {song.duration}</p>
            <p>Added by: {song.addedBy?.username}</p>
          </>
        )}
      </div>
      {isOwner && !editMode && (
        <div className="song-detail-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default SongDetail
