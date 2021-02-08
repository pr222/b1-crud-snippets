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
   * Render view and send rendered HTML string as a HTTP response.
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
            content: snippet.content,
            createdAt: moment(snippet.createdAt).fromNow()
          }))
      }

      res.render('snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async new (req, res, next) {
    res.render('snippets/new')
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async create (req, res, next) {
    try {
      const snippet = new Snippet({
        title: req.body.snippetTitle,
        content: req.body.codeSnippet
      })
      console.log(snippet)
      await snippet.save()
      console.log(snippet)

      req.session.flash = { type: 'success', text: 'The snippet was created successfully.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./new')
    }
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async showSnippet (req, res, next) {
    try {
      console.log(req.params.id)
      const snippet = await Snippet.findOne({ _id: req.params.id })

      console.log(snippet)
      const viewData = {
        id: snippet._id,
        title: snippet.title,
        createdAt: snippet.createdAt,
        content: snippet.content
      }

      console.log(viewData)
      res.render('snippets/showSnippet', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async edit (req, res, next) {
    try {
      console.log(req.params.id)
      const snippet = await Snippet.findOne({ _id: req.params.id })

      console.log(snippet)

      const viewData = {
        id: snippet._id,
        title: snippet.title,
        createdAt: snippet.createdAt,
        content: snippet.content
      }

      console.log(viewData)
      res.render('snippets/edit', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async update (req, res, next) {
    try {
      let snippet = await Snippet.findOne({ _id: req.params.id })
      // console.log('FOUND:' + snippet)
      // snippet = {
      snippet.title = req.body.snippetTitle
      snippet.content = req.body.codeSnippet
      // }

      // console.log('UPDATE:' + snippet)

      snippet = await snippet.save()
      // await snippet.updateOne({ title: req.body.snippetTitle }, { content: req.body.codeSnippet })
      // console.log('UPDATED?:' + snippet)

      req.session.flash = { type: 'success', text: 'The snippet was successfully updated.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./:id/edit')
    }
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async remove (req, res, next) {
    try {
      console.log(req.params.id)
      const snippet = await Snippet.findOne({ _id: req.params.id })

      console.log(snippet)

      const viewData = {
        id: snippet._id,
        title: snippet.title,
        content: snippet.content
      }

      console.log(viewData)
      res.render('snippets/delete', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async delete (req, res, next) {
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
