/**
 * Sub-router for snippets.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { SnippetsController } from '../controllers/snippets-controller.js'

export const router = express.Router()

const controller = new SnippetsController()

// Index page for viewing all snippets.
router.get('/', controller.index)

router.get('/new', controller.new)
router.post('/create', controller.isLoggedIn, controller.create)

router.get('/:id', controller.showSnippet)

router.get('/:id/edit', controller.edit)
router.post('/:id/update', controller.isLoggedIn, controller.isOwner, controller.update)

router.get('/:id/remove', controller.remove)
router.post('/:id/delete', controller.isLoggedIn, controller.isOwner, controller.delete)
