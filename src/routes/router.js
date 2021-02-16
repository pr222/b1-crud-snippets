/**
 * Main router point for sub-routers.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as snippetsRouter } from './snippets-router.js'
import { router as usersRouter } from './users-router.js'

export const router = express.Router()

router.use('/', snippetsRouter)

router.use('/users/', usersRouter)

router.use('*', (req, res, next) => {
  return next(createError(404, 'Not Found'))
})
