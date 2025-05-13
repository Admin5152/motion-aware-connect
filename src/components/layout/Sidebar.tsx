
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Map, 
  Table, 
  MessageSquare, 
  Settings, 
  Phone,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { EmergencyButton } from '@/components/safety/EmergencyButton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const SidebarNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Map, label: 'Map', path: '/' },
    { icon: MessageSquare, label: 'Inbox', path: '/inbox' },
    { icon: Table, label: 'History', path: '/history' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  // Desktop sidebar
  const DesktopSidebar = () => (
    <Sidebar className="hidden md:flex h-screen w-60 border-r pt-16">
      <SidebarContent className="flex flex-col justify-between h-full">
        <div className="space-y-1 px-3 py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                location.pathname === item.path ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="p-4">
          <EmergencyButton />
        </div>
      </SidebarContent>
    </Sidebar>
  );

  // Mobile sidebar (sheet/drawer)
  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden fixed top-3 left-4 z-40">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-60 pt-10">
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                  location.pathname === item.path ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="p-4">
            <EmergencyButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default SidebarNav;
