// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PremiumRoute from './components/PremiumRoute'
import { Layout } from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Checklist from './pages/Checklist'
import Assistant from './pages/Assistant'
import LegacyVault from './pages/LegacyVault'
import Upgrade from './pages/Upgrade'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes — login required */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/checklist/:category" element={<ProtectedRoute><Checklist /></ProtectedRoute>} />
          <Route path="/assistant/:category" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
          <Route path="/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />

          {/* Premium routes — login + premium required */}
          <Route path="/legacy-vault" element={<PremiumRoute><LegacyVault /></PremiumRoute>} />
        </Routes>
      </Layout>
    </Router>
  )
}
