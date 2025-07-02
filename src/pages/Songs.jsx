import React, { useEffect, useState } from 'react'
import { getAllSongs } from '../services/ShowSongs'
import AddSong from '../components/AddSong'
import { useNavigate } from 'react-router-dom'

const Songs = ({ user }) => {
  const [songs, setSongs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getAllSongs()
        setSongs(data)
      } catch (error) {
        console.error('Failed to fetch songs:', error)
      }
    }
    fetchSongs()
  }, [])

  // Refresh songs after adding a new one
  const handleSongAdded = () => {
    getAllSongs().then(setSongs)
  }

  return (
    <div className="songs-page">
      {user && <AddSong onSongAdded={handleSongAdded} />}
      <h2>All Songs</h2>
      <ul className="songs-list">
        {songs.map((song) => (
          <li
            key={song._id}
            onClick={() => navigate(`/songs/${song._id}`)}
            className="song-item"
          >
            <strong>{song.title}</strong> by {song.artist}
            <div className="added-by">Added by: {song.addedBy?.username}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Songs
