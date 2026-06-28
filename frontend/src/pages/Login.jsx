// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login'

    try {
      const res = await fetch(`https://sahara-x622.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isSignup ? { name, email, password } : { email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Something went wrong')
        return
      }

      localStorage.setItem('token', data.token)
      navigate('/dashboard')

    } catch (err) {
      setError('Could not connect to server')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    fontFamily: "'DM Sans', sans-serif",
    padding: '13px 18px',
    borderRadius: '14px',
    border: '1px solid #E8DFD4',
    backgroundColor: '#F5F0E8',
    color: '#3F3A34',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
  }

  return (
    <div style={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      backgroundColor: '#FAF6F0',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
    }}>

      {/* Background blobs */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-10%',
        width: '45%', height: '45%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(110,139,120,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-10%',
        width: '40%', height: '40%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(12px)',
          borderRadius: '28px',
          padding: '40px 36px',
          border: '1px solid #EAE0D5',
          boxShadow: '0 8px 40px rgba(63,58,52,0.08)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
          <div style={{
            padding: '8px', borderRadius: '10px',
            backgroundColor: 'rgba(110,139,120,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Heart style={{ width: '18px', height: '18px', color: '#6E8B78' }} strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#3F3A34', fontWeight: '500', fontStyle: 'italic' }}>
            Sahara
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.9rem',
          color: '#3F3A34',
          textAlign: 'center',
          marginBottom: '6px',
          fontWeight: '500',
        }}>
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          color: '#8A8178',
          textAlign: 'center',
          marginBottom: '28px',
        }}>
          {isSignup ? 'Start navigating what comes next.' : 'Continue where you left off.'}
        </p>

        {/* Error */}
        {error && (
          <div style={{
            marginBottom: '16px',
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            textAlign: 'center',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            fontFamily: "'DM Sans', sans-serif",
            border: '1px solid #fecaca',
          }}>
            {error}
          </div>
        )}

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={inputStyle}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              padding: '13px',
              borderRadius: '14px',
              backgroundColor: '#6E8B78',
              color: 'white',
              fontWeight: '500',
              fontSize: '15px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              width: '100%',
              marginTop: '4px',
              boxShadow: '0 4px 16px rgba(110,139,120,0.25)',
              transition: 'opacity 0.2s ease',
            }}
          >
            {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </div>

        {/* Switch */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          textAlign: 'center',
          marginTop: '24px',
          color: '#8A8178',
        }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsSignup(!isSignup); setError(''); setName('') }}
            style={{
              color: '#6E8B78',
              fontWeight: '600',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
            }}
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}