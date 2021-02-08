/**
 * Mongoose model of PureNumber.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import mongoose from 'mongoose'

const snippetsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const Snippet = mongoose.model('Snippet', snippetsSchema)
