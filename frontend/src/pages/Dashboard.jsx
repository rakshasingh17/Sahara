import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { categories } from '../data/checklists'

export default function Dashboard() {
  const categoryList = Object.values(categories)

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 32px', width: '100%' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#3F3A34', marginBottom: '12px', fontWeight: '500', fontStyle: 'italic' }}>
          How can we help you today?
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', color: '#5C554D' }}>
          Select an area to focus on. There's no rush—take it one step at a time.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {categoryList.map((category) => {
          const IconComponent = Icons[category.iconName] || Icons.Circle
          return (
            <motion.div key={category.slug} variants={item}>
              <Link
                to={`/checklist/${category.slug}`}
                style={{ textDecoration: 'none', display: 'block', backgroundColor: 'white', borderRadius: '20px', padding: '24px 28px', border: '1px solid #EAE0D5', boxShadow: '0 4px 20px -2px rgba(63,58,52,0.05)' }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#F0F4F1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <IconComponent style={{ width: '22px', height: '22px', color: '#6E8B78' }} strokeWidth={2} />
                </div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.4rem', color: '#3F3A34', marginBottom: '6px', fontWeight: '400' }}>
                  {category.title}
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#5C554D', lineHeight: '1.5', fontSize: '0.95rem', margin: 0 }}>
                  {category.description}
                </p>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}