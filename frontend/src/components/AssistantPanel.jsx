import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles } from 'lucide-react'

export default function AssistantPanel({ category }) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const welcomeMsg = `Hello. I'm here to help you with ${category.title.toLowerCase()}. What questions do you have about this process?`
    setMessages([{ id: `welcome-${category.slug}`, role: 'assistant', content: welcomeMsg }])
  }, [category.slug, category.title])

  const getSuggestedQuestions = () => {
    const base = ['Where do I even start?', 'How long does this take?']
    switch (category.slug) {
      case 'funeral-last-rites': return [...base, "What if there's no will?"]
      case 'legal-documents': return [...base, 'How many death certificates?']
      case 'finance-bank-accounts': return [...base, 'How do I freeze accounts?']
      case 'property-assets': return [...base, 'What do I do with their house?']
      case 'support-resources': return ['I feel overwhelmed', 'How do I find a counselor?']
      default: return [...base, "I can't find the documents"]
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (text) => {
    if (!text.trim()) return

    const newUserMsg = { id: Date.now().toString(), role: 'user', content: text }
    setMessages(prev => [...prev, newUserMsg])
    setInputValue('')
    setIsTyping(true)

    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/llm/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: text,
          category: category.title
        })
      })

      const data = await res.json()
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Sorry, I could not get a response.'
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.'
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '600px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #EAE0D5', boxShadow: '0 4px 20px -2px rgba(63,58,52,0.05)', overflow: 'hidden', position: 'sticky', top: '96px' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #EAE0D5', backgroundColor: '#FAF6F0', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#E2E8E4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles style={{ width: '16px', height: '16px', color: '#6E8B78' }} />
        </div>
        <div>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: '500', color: '#3F3A34', margin: 0, fontSize: '15px' }}>Sahara Guide</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#5C554D', margin: 0 }}>Here to support you</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: '12px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: msg.role === 'user' ? '#E6EDF2' : '#F0F4F1' }}>
              {msg.role === 'user'
                ? <User style={{ width: '16px', height: '16px', color: '#6E8B78' }} />
                : <Bot style={{ width: '16px', height: '16px', color: '#6E8B78' }} />
              }
            </div>
            <div style={{
              maxWidth: '80%', borderRadius: '16px', padding: '12px 16px', fontSize: '14px', lineHeight: '1.6',
              fontFamily: "'DM Sans', sans-serif",
              backgroundColor: msg.role === 'user' ? '#E6EDF2' : '#FAF6F0',
              color: '#3F3A34',
              border: msg.role === 'assistant' ? '1px solid #EAE0D5' : 'none',
              borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
              borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
            }}>
              {msg.content}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#F0F4F1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot style={{ width: '16px', height: '16px', color: '#6E8B78' }} />
            </div>
            <div style={{ backgroundColor: '#FAF6F0', borderRadius: '16px', borderTopLeftRadius: '4px', padding: '12px 16px', border: '1px solid #EAE0D5', display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#6E8B78', opacity: 0.5 }}
                  animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay }} />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && !isTyping && (
        <div style={{ padding: '0 16px 8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {getSuggestedQuestions().map((q, i) => (
            <button key={i} onClick={() => handleSend(q)}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', padding: '6px 12px', backgroundColor: '#FAF6F0', border: '1px solid #EAE0D5', borderRadius: '20px', color: '#5C554D', cursor: 'pointer' }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: '16px', borderTop: '1px solid #EAE0D5', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Ask anything about this category..."
            style={{ flexGrow: 1, padding: '12px 16px', backgroundColor: '#FAF6F0', border: '1px solid #EAE0D5', borderRadius: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#3F3A34', outline: 'none' }}
          />
          <button onClick={() => handleSend(inputValue)} disabled={!inputValue.trim() || isTyping}
            style={{ padding: '12px', backgroundColor: '#6E8B78', border: 'none', borderRadius: '12px', cursor: 'pointer', opacity: (!inputValue.trim() || isTyping) ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send style={{ width: '16px', height: '16px', color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
  )
}