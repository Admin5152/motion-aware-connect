
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const EmergencyButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmergencyCall = () => {
    // In a real app, this would connect to an emergency service
    // or send a distress signal to emergency contacts
    toast.success("Emergency services notified. Help is on the way.", {
      duration: 5000
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="emergency-button w-full">
          <div className="flex items-center justify-center gap-2">
            <div className="ripple-container">
              <Phone className="h-5 w-5" />
            </div>
            <span>Emergency</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-app-emergency">Emergency Services</DialogTitle>
          <DialogDescription>
            This will notify emergency services of your current location. Only use this feature in genuine emergencies.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center">
            <div className="text-7xl text-app-emergency font-bold mb-2">911</div>
            <p className="text-muted-foreground">Are you sure you want to call emergency services?</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleEmergencyCall}>
            Call Emergency Services
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
