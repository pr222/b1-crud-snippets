/**
 * Module for UsersController.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */

import { User } from '../models/users.js'
import createError from 'http-errors'

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

      req.session.regenerate(() => {
        req.session.user = user
        console.log(user)
        req.session.flash = { type: 'success', text: `Welcome ${user.username}!` }
        res.redirect('/')
      })
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
      if (req.session.user) {
        req.session.flash = { type: 'danger', text: 'Already logged in!' }
        res.redirect('/')
      }
      res.render('users/register')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create new user and save it to the database.
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
   * Logout only logged in user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   * @returns {Function} next - Express next-middleware function.
   */
  async logout (req, res, next) {
    try {
      if (!req.session.user) {
        return next(createError(404, 'Not Found'))
      }

      req.session.destroy()

      res.redirect('/')
    } catch (error) {
      next(error)
    }
  }
}
