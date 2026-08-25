import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal-950 text-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-xl bg-brand-700/20 text-brand-500 border border-brand-700/40 flex items-center justify-center animate-pulse">
            <Box className="w-6 h-6 animate-spin" />
          </div>
          <p className="text-xs font-mono text-charcoal-400">Verifying Owner Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/owner/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
