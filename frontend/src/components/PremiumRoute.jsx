// src/components/PremiumRoute.jsx
// Wraps any route that requires premium access.
// If user is not premium, shows an upgrade page instead.

import { Navigate } from 'react-router-dom'

const PremiumRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const isPremium = localStorage.getItem('isPremium') === 'true'

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (!isPremium) {
    return <Navigate to="/upgrade" replace />
  }

  return children
}

export default PremiumRoute
