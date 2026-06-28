// src/pages/Landing.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ListChecks, MessageCircle, ShieldCheck, PhoneCall, X } from 'lucide-react'

const SUPPORT_RESOURCES = [
  {
    name: 'Tele-MANAS',
    number: '14416',
    altNumber: '1-800-891-4416',
    description: 'Government of India, 24/7, free, in English and 20 regional languages. Includes a grief & loss focus area.',
  },
  {
    name: 'KIRAN Mental Health Helpline',
    number: '1800-599-0019',
    description: 'Government of India, 24/7, toll-free, multi-language mental health support.',
  },
]

const PREVIEW_CARDS = [
  {
    icon: ListChecks,
    title: 'Step-by-step checklists',
    description: "Legal, financial, medical, property, and memorial tasks — broken down so you always know what comes next.",
  },
  {
    icon: MessageCircle,
    title: 'A gentle AI guide',
    description: "Ask anything about what you're dealing with. Sahara responds with context, not generic answers.",
  },
  {
    icon: ShieldCheck,
    title: 'LegacyVault',
    description: 'Keep every account, policy, and document in one place — and hand your family a clear record when it matters.',
  },
]

export default function Landing() {
  const [showSupportModal, setShowSupportModal] = useState(false)

  return (
    <div style={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#FAF6F0',
    }}>

      {/* Soft background blobs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%',
        width: '50%', height: '50%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(110,139,120,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-10%',
        width: '55%', height: '55%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '640px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Heart icon */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            marginBottom: '16px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '14px',
            borderRadius: '18px',
            boxShadow: '0 2px 12px rgba(110,139,120,0.12)',
            border: '1px solid rgba(110,139,120,0.15)',
            display: 'inline-flex',
          }}
        >
          <Heart style={{ width: '26px', height: '26px', color: '#6E8B78' }} strokeWidth={2} />
        </motion.div>

        {/* App name */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '22px',
            fontStyle: 'italic',
            color: '#6E8B78',
            marginBottom: '20px',
            letterSpacing: '0.04em',
          }}
        >
          Sahara
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            color: '#3F3A34',
            lineHeight: 1.2,
            marginBottom: '20px',
            fontWeight: '500',
          }}
        >
          We help you figure out{' '}
          <span style={{ color: '#6E8B78', fontStyle: 'italic' }}>what comes next.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.1rem',
            color: '#5C554D',
            lineHeight: 1.7,
            marginBottom: '32px',
            maxWidth: '500px',
          }}
        >
          Navigating the practical logistics after losing a loved one can feel
          overwhelming. Sahara gently guides you through funeral arrangements,
          legal documents, and finances — one step at a time.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
          style={{ marginBottom: '16px' }}
        >
          <Link
            to="/login"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 48px',
              fontSize: '16px',
              fontWeight: '500',
              color: 'white',
              backgroundColor: '#6E8B78',
              borderRadius: '16px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(110,139,120,0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            Get Started
          </Link>
        </motion.div>

        {/* Support link */}
        <motion.button
          type="button"
          onClick={() => setShowSupportModal(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.33, ease: 'easeOut' }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '48px',
            fontSize: '13px',
            color: '#8A8178',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <PhoneCall style={{ width: '13px', height: '13px', color: '#6E8B78', flexShrink: 0 }} strokeWidth={2} />
          <span>
            Need to talk to someone?{' '}
            <span style={{ color: '#6E8B78', fontWeight: 500, textDecoration: 'underline' }}>
              Grief support resources
            </span>
            {' '}— no sign-in needed.
          </span>
        </motion.button>

        {/* Divider */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.38, ease: 'easeOut' }}
          style={{ width: '100%' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#EAE0D5' }} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#B0A89E',
              whiteSpace: 'nowrap',
            }}>
              A quick look inside
            </p>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#EAE0D5' }} />
          </div>

          {/* Preview cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            {PREVIEW_CARDS.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.43 + i * 0.07, ease: 'easeOut' }}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    border: '1px solid #EAE0D5',
                    borderRadius: '18px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '18px',
                    textAlign: 'left',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    backgroundColor: 'rgba(110,139,120,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '2px',
                  }}>
                    <Icon style={{ width: '18px', height: '18px', color: '#6E8B78' }} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px', fontWeight: '600',
                      color: '#3F3A34', marginBottom: '4px',
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px', color: '#5C554D',
                      lineHeight: 1.6, margin: 0,
                    }}>
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Support Modal */}
      <AnimatePresence>
        {showSupportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowSupportModal(false)}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: 'rgba(44,59,53,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px', zIndex: 50,
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#F5F0E8',
                borderRadius: '24px',
                border: '1px solid rgba(110,139,120,0.2)',
                boxShadow: '0 20px 60px rgba(44,59,53,0.25)',
                maxWidth: '480px', width: '100%',
                maxHeight: '85vh', overflowY: 'auto',
                padding: '32px', textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', color: '#2C3B35', margin: 0 }}>
                  Support is available
                </h2>
                <button
                  type="button"
                  onClick={() => setShowSupportModal(false)}
                  style={{
                    background: 'rgba(110,139,120,0.12)', border: 'none',
                    borderRadius: '999px', width: '32px', height: '32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0, marginLeft: '12px',
                  }}
                >
                  <X style={{ width: '16px', height: '16px', color: '#2C3B35' }} strokeWidth={2} />
                </button>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#5C6B63', lineHeight: 1.6, marginBottom: '24px' }}>
                If grief or loss is feeling heavy right now, these helplines are free,
                confidential, and available without needing to sign in or use Sahara at all.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {SUPPORT_RESOURCES.map((resource) => (
                  <div
                    key={resource.name}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(110,139,120,0.2)',
                      borderRadius: '16px', padding: '20px', textAlign: 'center',
                    }}
                  >
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '15px', color: '#2C3B35', margin: '0 0 4px' }}>
                      {resource.name}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#6E8B78', margin: '0 0 8px' }}>
                      {resource.number}
                      {resource.altNumber && (
                        <span style={{ fontSize: '13px', fontWeight: 400, color: '#5C6B63' }}> / {resource.altNumber}</span>
                      )}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#5C6B63', margin: 0, lineHeight: 1.6 }}>
                      {resource.description}
                    </p>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#5C6B63', fontStyle: 'italic', margin: 0 }}>
                You don't have to be in crisis to call. Reaching out is allowed, any time.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}