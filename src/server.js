/**
 * The starting point of the application.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import express from 'express'
import hbs from 'express-hbs'
import session from 'express-session'
import helmet from 'helmet'
import logger from 'morgan'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

/**
 * The main function.
 */
const main = async () => {
  await connectDB()

  const fullDirectory = dirname(fileURLToPath(import.meta.url))
  const baseURL = process.env.BASE_URL || '/'

  const app = express()

  const PORT = process.env.PORT || 3000

  app.use(logger('dev'))

  app.use(helmet())
  app.use(helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'style-src': ["'self'", 'https://fonts.googleapis.com/'],
      'font-src': ["'self'", 'https://fonts.gstatic.com']
    }
  }))

  app.use(express.static(join(fullDirectory, '..', 'public')))

  // Set up view engine
  app.engine('hbs', hbs.express4({
    defaultLayout: join(fullDirectory, 'views', 'layouts', 'default'),
    partialsDir: join(fullDirectory, 'views', 'partials')
  }))

  app.set('view engine', 'hbs')
  app.set('views', join(fullDirectory, 'views'))

  app.use(express.urlencoded({ extended: false }))

  // Middlewares
  const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
      sameSite: 'lax'
    }
  }

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sessionOptions.cookie.secure = true
  }

  app.use(session(sessionOptions))

  app.use((req, res, next) => {
    if (req.session.flash) {
      res.locals.flash = req.session.flash
      delete req.session.flash
    }

    res.locals.session = req.session

    res.locals.baseURL = baseURL

    next()
  })

  // Set routes
  app.use('/', router)

  // Errors
  app.use(function (err, req, res, next) {
    if (err.status === 403) {
      return res
        .status(403)
        .sendFile(join(fullDirectory, 'views', 'errors', '403-forbidden.html'))
    }

    if (err.status === 404) {
      return res
        .status(404)
        .sendFile(join(fullDirectory, 'views', 'errors', '404-not-found.html'))
    }

    if (req.app.get('env') !== 'development') {
      return res
        .status(500)
        .sendFile(join(fullDirectory, 'views', 'errors', '500-error.html'))
    }

    // Development only!
    res
      .status(err.status || 500)
      .render('errors/error', { error: err })
  })

  app.listen(PORT, () => {
    console.log(`The server is now running at http://localhost:${PORT}`)
    console.log('Press Ctrl+C to terminate.')
  })
}

try {
  main()
} catch (err) {
  console.error(err)
}
