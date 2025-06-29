import Client from './api'

// Get all songs
export const getAllSongs = async () => {
  try {
    const res = await Client.get('/songs')
    return res.data
  } catch (error) {
    throw error
  }
}

// Get a single song by ID
export const getSongById = async (id) => {
  try {
    const res = await Client.get(`/songs/${id}`)
  } catch (error) {
    throw error
  }
}

// Create a new song
export const createSong = async (songData) => {
  try {
    const res = await Client.post('/songs', songData)
    return res.data
  } catch (error) {
    throw error
  }
}

// Update a Song
export const updateSong = async (id, songData) => {
  try {
    const res = await Client.put(`/'songs/${id}`, songData)
    return res.data
  } catch (error) {
    throw error
  }
}

// Delete a song
export const deleteSong = async (id) => {
  try {
    const res = await Client.delete(`/'songs/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

