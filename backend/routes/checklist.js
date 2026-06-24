import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()

// Get checklist progress for a category
router.get('/:category', auth, async (req, res) => {
  try {
    const { category } = req.params
    const userId = req.user.id // available from JWT now

    // TODO: fetch progress from database using userId + category

    res.status(200).json({ 
      category,
      completedItems: [] 
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Save checklist progress
router.post('/:category', auth, async (req, res) => {
  try {
    const { category } = req.params
    const { completedItems } = req.body
    const userId = req.user.id // available from JWT now

    // TODO: save progress to database using userId + category

    res.status(200).json({ message: 'Progress saved' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router