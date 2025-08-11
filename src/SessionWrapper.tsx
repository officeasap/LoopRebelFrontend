import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Loader from '@/components/ui/Loader';

export default function SessionWrapper() {
  const { user, setVerifiedSession, isLoading } = useAuth();
  const location = useLocation();
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    const refreshSession = async () => {
      try {
        // Fake verification for demo - replace with real token verification
        setVerifiedSession('mock_token');
        setSessionLoading(false);
      } catch (error) {
        setSessionLoading(false);
      }
    };
    
    refreshSession();
  }, [setVerifiedSession]);

  if (isLoading || sessionLoading) {
    return <Loader />;
  }

  const publicRoutes = ['/login', '/register', '/verify'];
  const isPublic = publicRoutes.includes(location.pathname);

  if (!user && !isPublic) return <Navigate to="/login" replace />;
  if (user && isPublic) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}