import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import authRoutes from './routes/auth.js'
import checklistRoutes from './routes/checklist.js'
import llmRoutes from './routes/llm.js'
import otpRoutes from './routes/otp.js'

connectDB()

const app = express()

app.use(cors({ origin: ["https://sahara-kohl.vercel.app"], credentials: true }))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/checklist', checklistRoutes)
app.use('/api/llm', llmRoutes)
app.use('/api/otp', otpRoutes)

app.get('/', (req, res) => {
  res.send('Sahara backend is running!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
