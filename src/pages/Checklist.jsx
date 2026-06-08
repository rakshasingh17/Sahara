import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowLeft, Check, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { categories } from '../data/checklists'
import AssistantPanel from '../components/AssistantPanel'

export default function Checklist() {
  const { category: slug } = useParams()
  const navigate = useNavigate()
  const category = slug ? categories[slug] : null

  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState(new Set())
  const [expandedTasks, setExpandedTasks] = useState(new Set())
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDetail, setEditDetail] = useState('')
  const [deletingTaskId, setDeletingTaskId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDetail, setNewDetail] = useState('')

  useEffect(() => {
    if (!category) navigate('/dashboard')
    else {
      setTasks(category.tasks)
      setCompletedTasks(new Set())
      setExpandedTasks(new Set())
      setEditingTaskId(null)
      setDeletingTaskId(null)
      setIsAdding(false)
    }
  }, [category, navigate])

  if (!category) return null

  const progress = tasks.length > 0 ? Math.round((completedTasks.size / tasks.length) * 100) : 0

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => {
      const next = new Set(prev)
      next.has(taskId) ? next.delete(taskId) : next.add(taskId)
      return next
    })
  }

  const toggleExpand = (taskId) => {
    setExpandedTasks(prev => {
      const next = new Set(prev)
      next.has(taskId) ? next.delete(taskId) : next.add(taskId)
      return next
    })
  }

  const startEdit = (task) => {
    setEditingTaskId(task.id)
    setEditTitle(task.title)
    setEditDetail(task.detail)
    setExpandedTasks(prev => new Set(prev).add(task.id))
  }

  const saveEdit = () => {
    if (!editTitle.trim()) return
    setTasks(prev => prev.map(t => t.id === editingTaskId ? { ...t, title: editTitle, detail: editDetail } : t))
    setEditingTaskId(null)
  }

  const confirmDelete = (taskId) => {
    if (deletingTaskId === taskId) {
      setTasks(prev => prev.filter(t => t.id !== taskId))
      setCompletedTasks(prev => { const next = new Set(prev); next.delete(taskId); return next })
      setExpandedTasks(prev => { const next = new Set(prev); next.delete(taskId); return next })
      setDeletingTaskId(null)
    } else {
      setDeletingTaskId(taskId)
      setTimeout(() => setDeletingTaskId(cur => cur === taskId ? null : cur), 3000)
    }
  }

  const saveNewTask = () => {
    if (!newTitle.trim()) return
    setTasks(prev => [...prev, { id: `custom-${Date.now()}`, title: newTitle, detail: newDetail }])
    setIsAdding(false)
    setNewTitle('')
    setNewDetail('')
  }

  const inputStyle = {
    fontFamily: "'DM Sans', sans-serif",
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #EAE0D5',
    backgroundColor: '#FAF6F0',
    color: '#3F3A34',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 48px', width: '100%' }}>
      {/* Back link */}
      <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#5C554D', textDecoration: 'none', marginBottom: '24px' }}>
        <ArrowLeft style={{ width: '16px', height: '16px' }} />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#3F3A34', marginBottom: '8px', fontWeight: '600' }}>
            {category.title}
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#5C554D', fontSize: '1rem' }}>
            {category.description}
          </p>
        </div>

        {/* Progress */}
        <div style={{ minWidth: '220px', backgroundColor: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #EAE0D5', boxShadow: '0 2px 8px rgba(63,58,52,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: '500', color: '#3F3A34', marginBottom: '8px' }}>
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div style={{ height: '6px', backgroundColor: '#F0EBE1', borderRadius: '99px', overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', backgroundColor: '#6E8B78', borderRadius: '99px' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        {/* Checklist + Resources */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <AnimatePresence mode="popLayout">
            {tasks.map((task, index) => {
              const isCompleted = completedTasks.has(task.id)
              const isExpanded = expandedTasks.has(task.id)
              const isEditing = editingTaskId === task.id
              const isDeleting = deletingTaskId === task.id

              return (
                <motion.div
                  layout key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ delay: index * 0.05, layout: { duration: 0.3 } }}
                  style={{
                    backgroundColor: isCompleted && !isEditing ? '#F5F8F5' : 'white',
                    borderRadius: '16px',
                    border: `1px solid ${isCompleted && !isEditing ? '#C5D9C8' : '#EAE0D5'}`,
                    boxShadow: '0 2px 8px rgba(63,58,52,0.04)',
                    padding: '16px 20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <button
                      onClick={() => toggleTask(task.id)}
                      disabled={isEditing}
                      style={{
                        marginTop: '2px', flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%',
                        border: `2px solid ${isCompleted ? '#6E8B78' : '#D8CFC4'}`,
                        backgroundColor: isCompleted ? '#6E8B78' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: isEditing ? 'not-allowed' : 'pointer', opacity: isEditing ? 0.5 : 1,
                        outline: 'none',
                      }}
                    >
                      <AnimatePresence>
                        {isCompleted && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check style={{ width: '12px', height: '12px', color: 'white' }} strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>

                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} style={inputStyle} autoFocus />
                          <textarea value={editDetail} onChange={e => setEditDetail(e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Details..." />
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={saveEdit} style={{ padding: '8px 16px', backgroundColor: '#6E8B78', color: 'white', border: 'none', borderRadius: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', cursor: 'pointer' }}>Save</button>
                            <button onClick={() => setEditingTaskId(null)} style={{ padding: '8px 16px', backgroundColor: '#FAF6F0', color: '#3F3A34', border: '1px solid #EAE0D5', borderRadius: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                            <button onClick={() => toggleExpand(task.id)} style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexGrow: 1 }}>
                              <span style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: '500',
                                color: isCompleted ? '#8A8178' : '#3F3A34',
                                textDecoration: isCompleted ? 'line-through' : 'none',
                              }}>
                                {task.title}
                              </span>
                            </button>

                            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexShrink: 0 }}>
                              <button onClick={() => startEdit(task)} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#8A8178', borderRadius: '6px' }}>
                                <Pencil style={{ width: '14px', height: '14px' }} />
                              </button>
                              <button onClick={() => confirmDelete(task.id)}
                                style={{ padding: '6px', background: isDeleting ? '#fef2f2' : 'none', border: 'none', cursor: 'pointer', color: isDeleting ? '#dc2626' : '#8A8178', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Trash2 style={{ width: '14px', height: '14px' }} />
                                {isDeleting && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px' }}>Confirm</span>}
                              </button>
                              <button onClick={() => toggleExpand(task.id)} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#8A8178', borderRadius: '6px' }}>
                                <ChevronDown style={{ width: '16px', height: '16px', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                              </button>
                            </div>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#5C554D', lineHeight: '1.6', paddingTop: '10px', margin: 0 }}>
                                  {task.detail}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Add Task */}
          <div style={{ paddingTop: '8px' }}>
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #C5D9C8', padding: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="New task title" style={inputStyle} autoFocus />
                    <textarea value={newDetail} onChange={e => setNewDetail(e.target.value)} placeholder="Details (optional)..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={saveNewTask} disabled={!newTitle.trim()} style={{ padding: '8px 16px', backgroundColor: '#6E8B78', color: 'white', border: 'none', borderRadius: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', cursor: 'pointer', opacity: !newTitle.trim() ? 0.5 : 1 }}>Add Task</button>
                      <button onClick={() => { setIsAdding(false); setNewTitle(''); setNewDetail('') }} style={{ padding: '8px 16px', backgroundColor: '#FAF6F0', color: '#3F3A34', border: '1px solid #EAE0D5', borderRadius: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsAdding(true)}
                  style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'transparent', border: '2px dashed #EAE0D5', borderRadius: '16px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#8A8178', cursor: 'pointer' }}>
                  <Plus style={{ width: '18px', height: '18px' }} />
                  Add a task
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Resources Section */}
          {category.resources && (
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#3F3A34', marginBottom: '16px', fontWeight: '600' }}>
                Helpful Resources
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {category.resources.map((resource, i) => (
                  <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: '14px', padding: '14px 18px', border: '1px solid #EAE0D5', textDecoration: 'none' }}>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: '600', color: '#6E8B78', marginBottom: '4px' }}>
                        {resource.title}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#5C554D' }}>
                        {resource.description}
                      </div>
                    </div>
                    <ExternalLink style={{ width: '14px', height: '14px', color: '#8A8178', flexShrink: 0, marginLeft: '12px' }} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Assistant Panel */}
        <AssistantPanel category={category} />
      </div>
    </div>
  )
}