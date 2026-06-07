import express from 'express'

const router = express.Router()

// Get checklist progress for a category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params

    // TODO: get user from token
    // TODO: fetch progress from database

    res.status(200).json({ 
      category,
      completedItems: [] 
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Save checklist progress
router.post('/:category', async (req, res) => {
  try {
    const { category } = req.params
    const { completedItems } = req.body

    // TODO: get user from token
    // TODO: save progress to database

    res.status(200).json({ message: 'Progress saved' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router