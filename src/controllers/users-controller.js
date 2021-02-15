/**
 * Module for UsersController.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import { User } from '../models/users.js'

/**
 * Encapsulation of controller.
 */
export class UsersController {
  /**
   * Display login-page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async index (req, res, next) {
    try {
      res.render('users/login')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Perform a login.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await User.authenticate(req.body.usernameInput, req.body.passwordInput)

      req.session.user = user

      req.session.flash = { type: 'success', text: `Welcome ${user.username}!` }
      res.redirect('/')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./login')
    }
  }

  /**
   * Display page for user to register at.
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

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async createUser (req, res, next) {
    try {
      const user = new User({
        username: req.body.usernameInput,
        password: req.body.passwordInput
      })

      await user.save()

      req.session.flash = { type: 'success', text: 'You can now log in!' }
      res.redirect('./login')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./register')
    }
  }

  /**
   * Render view and send rendered HTML string as a HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async logout (req, res, next) {
    try {
      // Terminate session
      req.session.destroy(() => {
        console.log('LOGGING OUT NOW...')
      })

      res.redirect('/')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('/')
    }
  }
}
