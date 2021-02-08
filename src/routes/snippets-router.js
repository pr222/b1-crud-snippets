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

// Index page with all snippets.
router.get('/', controller.index)

// Page for creating a new snippet.
router.get('/new', controller.new)
router.post('/create', controller.create)

// View an individual snippet.
router.get('/:id', controller.showSnippet)
// Update snippet
router.get('/:id/edit', controller.edit)
router.post('/:id/update', controller.update)

// Removing snippets
router.get('/:id/remove', controller.remove)
router.post('/:id/delete', controller.delete)
