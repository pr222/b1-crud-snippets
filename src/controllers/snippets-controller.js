/**
 * Module for SnippetsController.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import moment from 'moment'
import { Snippet } from '../models/snippets.js'
// const ID = 0

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
      console.log(viewData.snippets.length)
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
    //
    res.render('snippets/new')
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
   */
  async edit (req, res) {
    //
    res.render('snippets/edit')
  }
}
