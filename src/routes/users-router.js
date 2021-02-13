/**
 * Sub-router for users.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { UsersController } from '../controllers/users-controller.js'

export const router = express.Router()

const controller = new UsersController()

router.get('/login', controller.index)
router.post('/login', controller.login)

router.get('/register', controller.register)
router.post('/register', controller.createUser)

router.get('/logout', controller.logout)
