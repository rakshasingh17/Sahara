// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Login() {
  const [isSignup, setIsSignup] = useState(false)
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
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
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
    padding: '10px 16px',
    borderRadius: '12px',
    border: '1px solid #EAE0D5',
    backgroundColor: '#F0EBE1',
    color: '#3F3A34',
    fontSize: '15px',
    outline: 'none',
    width: 'calc(100% - 16px)',
    display: 'block',
    margin: '0 auto',
    boxSizing: 'border-box',
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md rounded-2xl p-10"
        style={{ backgroundColor: '#FAF6F0', border: '1px solid #EAE0D5', boxShadow: '0 4px 20px -2px rgba(63,58,52,0.08)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="p-1.5 rounded-md" style={{ backgroundColor: 'rgba(110,139,120,0.1)' }}>
            <Heart className="w-5 h-5" strokeWidth={2.5} style={{ color: '#6E8B78' }} />
          </div>
          <span className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', serif", color: '#3F3A34' }}>
            Sahara
          </span>
        </div>

        <h2 className="text-3xl text-center mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#3F3A34' }}>
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="text-sm text-center mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: '#5C554D' }}>
          {isSignup ? 'Start navigating what comes next.' : 'Continue where you left off.'}
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm text-center" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
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
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: '#6E8B78',
              color: 'white',
              fontWeight: '500',
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer',
              opacity: loading ? 0.6 : 1,
              width: 'calc(100% - 16px)',
              display: 'block',
              margin: '0 auto',
            }}
          >
            {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </div>

        <p className="text-sm text-center mt-6" style={{ fontFamily: "'DM Sans', sans-serif", color: '#5C554D' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            style={{ color: '#6E8B78', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}