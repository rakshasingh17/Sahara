import express from 'express'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import Otp from '../models/Otp.js'
import User from '../models/User.js'

const router = express.Router()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString()
const hashOtp = (otp) => crypto.createHash('sha256').update(otp).digest('hex')

// POST /api/otp/send
router.post('/send', async (req, res) => {
  try {
    const { ownerEmail } = req.body
    const owner = await User.findOne({ email: ownerEmail })
    if (!owner) return res.status(404).json({ message: 'No account found with this email' })
    if (!owner.nomineeEmail) return res.status(400).json({ message: 'No nominee email registered' })

    const otp = generateOtp()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await Otp.deleteMany({ email: ownerEmail })
    await Otp.create({ email: ownerEmail, otp: hashOtp(otp), expiresAt })

    await transporter.sendMail({
      from: `"Sahara" <${process.env.EMAIL_USER}>`,
      to: owner.nomineeEmail,
      subject: 'Your LegacyVault Access OTP',
      html: `
        <div style="font-family:sans-serif;max-width:400px;">
          <h2 style="color:#1A7A55">LegacyVault Access</h2>
          <p>Someone is requesting access to the LegacyVault of <strong>${owner.name}</strong>.</p>
          <h1 style="letter-spacing:8px;color:#1A7A55">${otp}</h1>
          <p>This OTP expires in <strong>10 minutes</strong>.</p>
        </div>
      `
    })

    res.status(200).json({ message: 'OTP sent to nominee email' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to send OTP' })
  }
})

// POST /api/otp/verify
router.post('/verify', async (req, res) => {
  try {
    const { ownerEmail, otp } = req.body
    const record = await Otp.findOne({ email: ownerEmail })
    if (!record) return res.status(400).json({ message: 'OTP expired. Please request a new one.' })
    if (record.otp !== hashOtp(otp)) return res.status(400).json({ message: 'Incorrect OTP' })
    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ email: ownerEmail })
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' })
    }

    await Otp.deleteOne({ email: ownerEmail })
    res.status(200).json({ message: 'OTP verified', ownerEmail })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Verification failed' })
  }
})

export default router