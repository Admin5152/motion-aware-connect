
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SidebarNav from '@/components/layout/Sidebar';
import Dashboard from './Dashboard';

const Index = () => {
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
