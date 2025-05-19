
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Map, 
  Table, 
  MessageSquare, 
  Settings, 
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { EmergencyButton } from '@/components/safety/EmergencyButton';

const SidebarNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Map, label: 'Map', path: '/' },
    { icon: MessageSquare, label: 'Inbox', path: '/inbox' },
    { icon: Table, label: 'History', path: '/history' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <Sidebar className="h-screen w-60 border-r pt-16">
      <SidebarContent className="flex flex-col justify-between h-full">
        <div className="space-y-1 px-3 py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'nav-item',
                location.pathname === item.path && 'active'
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
};

export default SidebarNav;
