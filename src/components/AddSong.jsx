import React, { useState } from 'react'
import { createSong } from '../services/ShowSongs'

const AddSong = ({ onSongAdded }) => {
  const [form, setForm] = useState({
    title: '',
    artist: '',
    url: '',
    duration: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    console.log('Token before createSong:', localStorage.getItem('token'))
    try {
      const newSong = await createSong(form)
      setSuccess('Song added!')
      setForm({ title: '', artist: '', url: '', duration: '' })
      if (onSongAdded) onSongAdded(newSong)
    } catch (err) {
      setError('Failed to add song. Make sure you are signed in.')
    }
  }

  return (
    <form className="add-song-form" onSubmit={handleSubmit}>
      <h3>Add a Song</h3>
      <div className="input-wrapper">
        <input
          className="add-song-input"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-wrapper">
        <input
          className="add-song-input"
          name="artist"
          placeholder="Artist"
          value={form.artist}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-wrapper">
        <input
          className="add-song-input"
          name="url"
          placeholder="Song URL"
          value={form.url}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-wrapper">
        <input
          className="add-song-input"
          name="duration"
          placeholder="Duration (Optional)"
          value={form.duration}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Song</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  )
}

export default AddSong
