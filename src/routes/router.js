/**
 * Main router point for sub-routers.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { router as snippetsRouter } from './snippets-router.js'
import { router as usersRouter } from './users-router.js'

export const router = express.Router()

router.use('/', snippetsRouter)

router.use('/users/', usersRouter)

router.use('*', (req, res, next) => {
  const error = new Error()
  error.status = 404
  error.message = 'Not Found'
  next(error)
})
