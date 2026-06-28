// src/pages/Upgrade.jsx
// Shown when a free user tries to access a premium feature like LegacyVault.

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Check, Sparkles, Heart } from 'lucide-react'

const FREE_FEATURES = [
  'Full checklist for all 5 categories',
  'AI grief assistant (5 messages/day)',
  'Resource links and guides',
]

const PREMIUM_FEATURES = [
  'Everything in Free',
  'Unlimited AI assistant messages',
  'LegacyVault — financial asset tracker',
  'Document storage and notes',
  'Priority support',
]

export default function Upgrade() {
  const navigate = useNavigate()

  const handleUpgrade = () => {
    // TODO: wire to payment gateway (Razorpay etc.)
    // For now, simulate premium access for demo
    localStorage.setItem('isPremium', 'true')
    navigate('/legacy-vault')
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px',
          backgroundColor: 'rgba(110,139,120,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <Lock style={{ color: '#6E8B78', width: '24px', height: '24px' }} />
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2rem', color: '#3F3A34',
          fontWeight: '500', marginBottom: '12px'
        }}>
          This is a premium feature
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '1.05rem', color: '#5C554D', lineHeight: '1.6'
        }}>
          LegacyVault helps families document all financial assets in one place.
          Upgrade to access it and more.
        </p>
      </motion.div>

      {/* Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}
      >
        {/* Free Plan */}
        <div style={{
          backgroundColor: 'white', borderRadius: '20px',
          padding: '24px', border: '1px solid #EAE0D5'
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: '600', color: '#9C9588', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Free</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#3F3A34', marginBottom: '4px' }}>₹0</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#9C9588', marginBottom: '20px' }}>Forever free</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FREE_FEATURES.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Check style={{ color: '#6E8B78', width: '16px', height: '16px', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#5C554D' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Plan */}
        <div style={{
          backgroundColor: '#3F3A34', borderRadius: '20px',
          padding: '24px', border: '1px solid #3F3A34', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: '16px', right: '16px',
            backgroundColor: '#6E8B78', borderRadius: '20px',
            padding: '3px 10px',
            fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
            fontWeight: '600', color: 'white'
          }}>
            Popular
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: '600', color: '#9C9588', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Premium</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'white', marginBottom: '4px' }}>₹299<span style={{ fontSize: '1rem', fontWeight: '400' }}>/mo</span></p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#9C9588', marginBottom: '20px' }}>Cancel anytime</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {PREMIUM_FEATURES.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Check style={{ color: '#6E8B78', width: '16px', height: '16px', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#D4CEC7' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}
      >
        <button
          onClick={handleUpgrade}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            padding: '14px 40px', borderRadius: '14px',
            backgroundColor: '#6E8B78', color: 'white',
            fontWeight: '500', fontSize: '15px',
            border: 'none', cursor: 'pointer', width: '100%', maxWidth: '320px'
          }}
        >
          Upgrade to Premium — ₹299/mo
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: 'none', border: 'none',
            color: '#9C9588', fontSize: '14px', cursor: 'pointer'
          }}
        >
          Go back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
          <Heart style={{ width: '14px', height: '14px', color: '#6E8B78' }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#9C9588' }}>
            Proceeds support grief counselling services in India
          </span>
        </div>
      </motion.div>

    </div>
  )
}
