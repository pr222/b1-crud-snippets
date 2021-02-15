/**
 * Module for SnippetsController.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import moment from 'moment'
import { Snippet } from '../models/snippets.js'
// import { User } from '../models/users.js'

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
      console.log(req.session)
      console.log(req.session.user)
      res.locals.session = req.session
      // const username = await User.findOne({ username: req.session.user.username }).username
      const viewData = {
        snippets: (await Snippet.find({}))
          .map(snippet => ({
            id: snippet._id,
            title: snippet.title,
            author: snippet.author,
            content: snippet.content,
            createdAt: moment(snippet.createdAt).fromNow()
          }))
          .reverse()// ,
        // user: username
      }
      //  .findOne({ _id: req.params.id })
      Snippet.find().sort(({ created_at: -1 }))

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
      // const username = req.session.user.username
      console.log('SESSSSSSS')
      console.log(req.session.user)
      console.log(req.session.user.username)

      const snippet = new Snippet({
        title: req.body.snippetTitle,
        author: req.session.user.username,
        content: req.body.codeSnippet
      })

      console.log(snippet)

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
   * Render view and send rendered HTML string as a HTTP response.
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
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async delete (req, res) {
    try {
      let snippet = await Snippet.findOne({ _id: req.params.id })
      console.log('FOUND:' + snippet)

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
