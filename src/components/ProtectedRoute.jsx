// src/components/ProtectedRoute.jsx
// Wraps any route that requires the user to be logged in.
// If no token is found in localStorage, redirects to /login.
//
// USAGE in App.jsx:
//   import ProtectedRoute from './components/ProtectedRoute';
//
//   <Route path="/dashboard" element={
//     <ProtectedRoute><Dashboard /></ProtectedRoute>
//   } />
//   <Route path="/checklist" element={
//     <ProtectedRoute><Checklist /></ProtectedRoute>
//   } />

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // No token = not logged in → send to login page
    return <Navigate to="/login" replace />;
  }

  // Token exists → render the protected page
  return children;
};

export default ProtectedRoute;
