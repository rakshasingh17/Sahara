// src/pages/Landing.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Landing() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-sage-light/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-softblue-light/30 blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full text-center z-10 flex flex-col items-center">

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-4 bg-white/50 p-4 rounded-2xl shadow-sm border border-warmborder/30 inline-block"
        >
          <Heart className="w-8 h-8 text-sage" strokeWidth={2} />
        </motion.div>

        {/* Sahara name */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
          className="text-2xl font-serif italic text-sage mb-6 tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Sahara
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          We help you figure out{' '}
          <br className="hidden md:block" />
          <span className="text-sage italic">what comes next.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-xl text-charcoal-light max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Navigating the practical logistics after losing a loved one can feel
          overwhelming. Sahara gently guides you through funeral arrangements,
          legal documents, and finances, one step at a time.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-4"
        >
          <Link
            to="/login"
           className="inline-flex items-center justify-center min-w-[160px] px-16 py-5 text-xl font-medium text-white rounded-2xl transition-all duration-300 hover:opacity-90"
            style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: '#6E8B78' }}
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  )
}