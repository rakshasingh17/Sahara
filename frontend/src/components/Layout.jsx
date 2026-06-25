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
              className="text-sm font-medium text-charcoal-light hover:text-charcoal transition-colors px-3 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
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