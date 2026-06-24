import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    res.status(201).json({ message: 'User created successfully', token })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    res.status(200).json({ token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router