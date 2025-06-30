import React, { useEffect, useState } from 'react'
import { getAllSongs } from '../services/ShowSongs'
import AddSong from '../components/AddSong' // <-- Import AddSong

const Songs = ({ user }) => {
  const [songs, setSongs] = useState([])
  const [selectedSongId, setSelectedSongId] = useState(null)

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

  const handleSelect = (id) => {
    setSelectedSongId(id)
  }

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
            onClick={() => handleSelect(song._id)}
            className={`song-item${
              selectedSongId === song._id ? ' selected' : ''
            }`}
          >
            <strong>{song.title}</strong> by {song.artist}
            <div className="added-by">Added by: {song.addedBy?.username}</div>
          </li>
        ))}
      </ul>
      {selectedSongId && (
        <div className="selected-song">
          <h3>Selected Song ID: {selectedSongId}</h3>
        </div>
      )}
    </div>
  )
}

export default Songs
