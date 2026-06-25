// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Checklist from './pages/Checklist'
import Assistant from './pages/Assistant'

export default function App() {
  return (
    <Router>
      
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/checklist/:category" element={<ProtectedRoute><Checklist /></ProtectedRoute>} />
          <Route path="/assistant/:category" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  )
}