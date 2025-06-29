import { getPlaylistById } from '../../../TuneNest-backend/controllers/PlaylistController'
import Client from './api'

// Get all comment for a playlist
export const getCommentsByPlaylist = async (playlistId) => {
  try {
    const res = await Client.get(`/comment/playlist/${playlistId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

// Create a new comment on a playlist
export const createComment = async (playlistId, comment, token) => {
  try {
    const res = await Client.post(`/comment/playlist/${playlistId}`, { comment }, { headers: { Authorization: `Bearer ${token}`}}
    )
    return res.data
  } catch (error) {
    throw error
  }
}

// Update a comment
export const updateComment = async (commentId, comment, token) => {
  try {
    const res = await Client.put(`/comment/${commentId}`, { comment }, { headers: { Authorization: `Bearer ${token}`}})
    return res.data
  } catch (error) {
    throw error
  }
}

// Delete a comment
export const deleteComment = async (commentId, token) => {
  try {
    const res = await Client.delete(
      `/comment/${commentId}`,
      { comment },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return res.data
  } catch (error) {
    throw error
  }
}