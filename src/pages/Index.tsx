
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import SidebarNav from '@/components/layout/Sidebar';
import Dashboard from './Dashboard';
import Login from './Login';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(authStatus);
    };
    
    checkAuth();
    
    // Listen for storage events (when localStorage changes in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  // Only render after we've checked authentication
  if (isAuthenticated === null) {
    return null; // Initial loading state
  }
  
  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <SidebarNav />
        <div className="flex-1 overflow-auto pb-10">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;
