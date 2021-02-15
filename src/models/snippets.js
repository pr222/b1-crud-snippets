/**
 * Mongoose model of Snippet.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import mongoose from 'mongoose'

const snippetsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  author: {
    type: String,
    required: true,
    minlength: 1
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
}, {
  timestamps: true
})

export const Snippet = mongoose.model('Snippet', snippetsSchema)
