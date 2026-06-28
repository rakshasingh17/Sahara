// src/components/Layout.jsx
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function Layout({ children }) {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const isLogin = location.pathname === '/login'

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal font-sans">
      {!isLanding && !isLogin && (
        <header className="w-full px-6 py-4 flex items-center justify-between border-b border-warmborder/50 bg-cream/80 backdrop-blur-sm sticky top-0 z-10">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded-lg p-1"
          >
            <div className="bg-sage/10 p-1.5 rounded-md group-hover:bg-sage/20 transition-colors">
              <Heart className="w-5 h-5 text-sage" strokeWidth={2.5} />
            </div>
            <span className="font-serif text-xl font-medium tracking-tight text-charcoal">
              Sahara
            </span>
          </Link>
          <nav>
            <button
              onClick={() => {
                localStorage.removeItem('token')
                window.location.href = '/'
              }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: '500',
                color: '#6E8B78',
                backgroundColor: 'transparent',
                border: '1px solid #6E8B78',
                borderRadius: '10px',
                padding: '3px 9px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#6E8B78'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#6E8B78'
              }}
            >
              Sign out
            </button>
          </nav>
        </header>
      )}

      <main className="flex-grow flex flex-col">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex-grow flex flex-col"
        >
          {children}
        </motion.div>
      </main>

      {isLanding && (
        <footer className="py-8 text-center text-sm text-charcoal-light/70"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <p>Sahara &copy; {new Date().getFullYear()}. Here for you.</p>
        </footer>
      )}
    </div>
  )
}