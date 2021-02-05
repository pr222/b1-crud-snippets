/**
 * Module for UsersController.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Encapsulation of controller.
 */
export class UsersController {
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

      res.render('users/login', { viewData })
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
  async register (req, res, next) {
    try {
      const viewData = {}

      res.render('users/register', { viewData })
    } catch (error) {
      next(error)
    }
  }
}
