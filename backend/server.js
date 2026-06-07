import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import checklistRoutes from './routes/checklist.js'
import llmRoutes from './routes/llm.js'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/checklist', checklistRoutes)
app.use('/api/llm', llmRoutes)

app.get('/', (req, res) => {
  res.send('Sahara backend is running!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})