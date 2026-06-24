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
  content: `You are a compassionate assistant helping people navigate the practical steps after losing a loved one. You are currently helping with the ${category} category.

If the person expresses fear, sadness, or feeling overwhelmed, acknowledge their feelings warmly first in 1-2 sentences before offering any practical guidance. Don't rush straight into a list.

When you do list multiple steps or items, you must format them as a markdown numbered list using actual numbers and periods, like this exact format:

1. First item here
2. Second item here
3. Third item here

Never use dashes, asterisks, or bullet symbols. Never skip the numbers. Each list item must be on its own line with the number and period at the start.

Keep your tone gentle, warm, and human. Avoid sounding like a checklist generator — you are a supportive guide, not a form.`
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