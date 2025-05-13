
import React, { useState, useRef, useEffect } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Swipe detection variables
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50; // Minimum swipe distance in pixels

  useEffect(() => {
    // Handle touch start
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };

    // Handle touch end
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      handleSwipe();
    };

    // Handle swipe logic
    const handleSwipe = () => {
      const swipeDistance = touchEndX.current - touchStartX.current;
      
      // If swipe from left to right and starting near the edge
      if (swipeDistance > minSwipeDistance && touchStartX.current < 30) {
        setIsSidebarOpen(true);
      } 
      // If swipe from right to left while sidebar is open
      else if (swipeDistance < -minSwipeDistance && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    // Add event listeners
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    // Clean up
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isSidebarOpen]);
  
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
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
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
                onClick={() => setIsSidebarOpen(false)} // Close sidebar when a link is clicked
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

  // Add a swipe indicator for mobile
  const SwipeIndicator = () => (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 md:hidden">
      <div className="bg-accent/50 h-24 w-2 rounded-r-md opacity-30" />
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
      <SwipeIndicator />
    </>
  );
};

export default SidebarNav;
