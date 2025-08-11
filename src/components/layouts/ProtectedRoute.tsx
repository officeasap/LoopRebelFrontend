// LoopRebel-Frontend/src/components/layouts/ProtectedRoute.tsx
// language: tsx

import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Loader from '../Loader';

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setAuthenticated(!!data.user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <Loader />;
  return authenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
