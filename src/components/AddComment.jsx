import { useState } from 'react'
import { Form } from 'react-router-dom'

const AddComment = ({ onAdd }) => {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    setLoading(true)
    await onAdd(comment)
    setComment('')
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="add-comment-form"
      style={{ margin: '1rem 0' }}
    >
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        rows={2}
        style={{ width: '100%' }}
        required
      />
      <button type="submit" disabled={loading || !comment.trim()}>
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  )
}

export default AddComment
