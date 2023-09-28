import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import routes from './routes'

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', routes)

// Listen
app.listen(process.env.PORT, () => {
  console.log(`Middleware API listens to port ${process.env.PORT}`)
})