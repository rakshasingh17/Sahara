import express from 'express'
import auth from '../middleware/auth.js'
import Progress from '../models/Progress.js'

const router = express.Router()

// Get checklist progress for a category
router.get('/:category', auth, async (req, res) => {
  try {
    const { category } = req.params
    const userId = req.user.id

    const progress = await Progress.findOne({ userId, category })

    res.status(200).json({
      category,
      completedItems: progress ? progress.completedTasks : []
    })
  } catch (error) {
    console.error('Get progress error:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Save checklist progress
router.post('/:category', auth, async (req, res) => {
  try {
    const { category } = req.params
    const { completedItems } = req.body
    const userId = req.user.id

    await Progress.findOneAndUpdate(
      { userId, category },
      { completedTasks: completedItems },
      { upsert: true, new: true }
    )

    res.status(200).json({ message: 'Progress saved' })
  } catch (error) {
    console.error('Save progress error:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router