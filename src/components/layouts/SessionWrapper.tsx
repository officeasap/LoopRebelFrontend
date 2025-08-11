import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@/components/ui/Loader';

const SessionWrapper: React.FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader />
          <p className="text-muted-foreground">Loading LoopRebel...</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default SessionWrapper;