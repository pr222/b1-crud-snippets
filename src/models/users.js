/**
 * Mongoose model of User.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// ADD: static methods for helping with registering.
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: [10, 'The password must be at least 10 characters']
  }
}, {
  timestamps: true,
  versionKey: false
})

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

/**
 * Authenticate an user.
 *
 * @param {string} username - the username.
 * @param {string} password - the password.
 * @returns {object} - return user if valid.
 */// req.body.email, req.body.password
UserSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt. Try again.')
  }

  return user
}

export const User = mongoose.model('User', UserSchema)
