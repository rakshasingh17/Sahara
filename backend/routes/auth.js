import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // TODO: check if user already exists in database
    // TODO: save user to database

    const hashedPassword = await bcrypt.hash(password, 10)

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // TODO: find user in database
    // TODO: compare passwords

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
