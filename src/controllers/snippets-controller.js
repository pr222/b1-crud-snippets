/**
 * Module for SnippetsController.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
// import model.

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
      const viewData = {}

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
  async create (req, res, next) {
    const snippet = {
      name: req.body.name,
      content: req.body.content
    }

    await snippet.save()

    res.redirect('.')
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
