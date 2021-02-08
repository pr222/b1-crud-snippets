/**
 * The starting point of the application.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import express from 'express'
import hbs from 'express-hbs'
// import session from 'express-session'
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
  // const baseURL = process.env.BASE_URL || '/'

  const app = express()

  app.use(logger('dev'))

  app.use(helmet()) // ADD?

  app.use(express.static(join(fullDirectory, '..', 'public')))

  app.engine('hbs', hbs.express4({
    defaultLayout: join(fullDirectory, 'views', 'layouts', 'default'),
    partialsDir: join(fullDirectory, 'views', 'partials')
  }))

  app.set('view engine', 'hbs')
  app.set('views', join(fullDirectory, 'views'))

  app.use(express.urlencoded({ extended: false }))

  // ADD: middlewares

  app.use('/', router)

  // Errors
  app.use(function (err, req, res, next) {
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

    // Development only
    res
      .status(err.status || 500)
      .render('errors/error', { error: err })
  })

  app.listen(process.env.PORT, () => {
    console.log(`The server is now running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl+C to terminate.')
  })
}

try {
  main()
} catch (err) {
  console.error(err)
}
