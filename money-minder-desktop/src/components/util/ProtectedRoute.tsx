import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../../util/AuthService';

const ProtectedRoute: React.FC = () => {
  // Check if user is authenticated
  const isAuthenticated = AuthService.isAuthenticated();

  // If not authenticated, redirect to login
  // Otherwise, render the child routes
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;