import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }){
  const { user, loading } = useAuth();
  if (loading) return <div className="container" style={{padding:'30px 0'}}>Loading...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;
  return children;
}