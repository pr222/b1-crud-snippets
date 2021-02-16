/**
 * Module for SnippetsController.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import moment from 'moment'
import { Snippet } from '../models/snippets.js'

/**
 * Encapsulation of controller for snippets.
 */
export class SnippetsController {
  /**
   * Display all snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = {
        snippets: (await Snippet.find({}))
          .map(snippet => ({
            id: snippet._id,
            title: snippet.title,
            author: snippet.author,
            content: snippet.content,
            createdAt: moment(snippet.createdAt).fromNow()
          }))
          .reverse()
      }

      // Display latest from the top.
      Snippet.find().sort(({ created_at: -1 }))

      res.locals.session = req.session

      res.render('snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Display a form for entering a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async new (req, res, next) {
    try {
      const viewData = {
        title: '',
        author: '',
        content: ''
      }
      res.locals.session = req.session

      res.render('snippets/new', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create the new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async create (req, res, next) {
    try {
      const snippet = new Snippet({
        title: req.body.snippetTitle,
        author: req.session.user.username,
        content: req.body.codeSnippet
      })

      await snippet.save()

      req.session.flash = { type: 'success', text: 'The snippet was created successfully.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./new')
    }
  }

  /**
   * Display an individual snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async showSnippet (req, res, next) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })

      const viewData = {
        id: snippet._id,
        title: snippet.title,
        content: snippet.content
      }

      res.render('snippets/showSnippet', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Display a snippet in an editable form.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async edit (req, res) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })

      const viewData = {
        id: snippet._id,
        title: snippet.title,
        content: snippet.content
      }

      res.render('snippets/edit', { viewData })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('/')
    }
  }

  /**
   * Update and save the newly edited snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async update (req, res) {
    try {
      let snippet = await Snippet.findOne({ _id: req.params.id })

      snippet.title = req.body.snippetTitle
      snippet.content = req.body.codeSnippet

      snippet = await snippet.save()

      req.session.flash = { type: 'success', text: 'The snippet was successfully updated.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./edit')
    }
  }

  /**
   * Display non-editable form for snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async remove (req, res) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })

      const viewData = {
        id: snippet._id,
        title: snippet.title,
        content: snippet.content
      }

      res.render('snippets/delete', { viewData })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('/')
    }
  }

  /**
   * Remove snippet from the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async delete (req, res) {
    try {
      let snippet = await Snippet.findOne({ _id: req.params.id })

      snippet.title = req.body.snippetTitle
      snippet.content = req.body.codeSnippet

      snippet = await snippet.remove()

      req.session.flash = { type: 'success', text: 'The snippet was successfully removed.' }
      res.redirect('/')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./delete')
    }
  }
}
