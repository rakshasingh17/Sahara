import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/chat', auth, async (req, res) => {
  try {
    const { message, category } = req.body

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are a compassionate assistant helping people navigate the practical steps after losing a loved one. You are currently helping with the ${category} category. Be gentle, clear and concise.`
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    })

    const data = await response.json()
console.log('Groq response:', JSON.stringify(data))
const reply = data.choices[0].message.content

    res.status(200).json({ reply })
  } catch (error) {
  console.error('LLM Error:', error)
  res.status(500).json({ message: 'Something went wrong', error: error.message })
}
})

export default router