import Client from './api'

// Get all public playlists
export const getAllPublicPlaylists = async () => {
  try {
    const res = await Client.get('/playlist/public')
    return res.data
  } catch (error) {
    throw error
  }
}

// Get a single playlist by ID
export const getplaylistById = async (id) => {
  try {
    const res = await Client.get(`/playlist/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

// Create a new playlist
export const createPlaylist = async (playlistData) => {
  try {
    const res = await Client.post('/playlists', playlistData)
    return res.data
  } catch (error) {
    throw error
  }
}

// Update a playlist
export const updatePlaylist = async (id, playlistData) => {
  try {
    const res = await Client.put(`/playlists/${id}`, playlistData)
    return res.data
  } catch (error) {
    throw error
  }
}

// Delete a playlist
export const deletePlaylist = async (id) => {
  try {
    const res = await Client.delete(`/playlists/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}