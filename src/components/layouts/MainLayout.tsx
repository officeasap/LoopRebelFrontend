import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import MobileNav from './MobileNav';
import Footer from './Footer';

const Header: React.FC = () => (
  <header className="py-4 text-center border-b border-border">
    <h1 className="brand text-3xl font-bold text-primary inline-flex justify-center items-center">
      Loop
      <span
        style={{ display: 'inline-block', transform: 'scaleX(-1)', margin: '0 0.1em' }}
        aria-label="Reversed R"
        title="Reversed R"
      >
        R
      </span>
      ebel
    </h1>
  </header>
);

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="mobile-container safe-area-inset bg-background min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pb-16 max-w-screen-md mx-auto w-full px-4">
        <Outlet />
      </main>

      <Footer />

      {isAuthenticated && <MobileNav />}
    </div>
  );
};

export default MainLayout;


