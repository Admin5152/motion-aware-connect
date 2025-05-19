
import React from 'react';
import { Button } from "@/components/ui/button";

const AppearanceSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium text-lg">Theme</h3>
        <div className="flex flex-wrap gap-4">
          <div className="border rounded-md p-3 cursor-pointer hover:border-primary">
            <div className="w-full h-24 bg-[#f8fafc] border rounded-md mb-2"></div>
            <p className="text-center">Light</p>
          </div>
          <div className="border rounded-md p-3 cursor-pointer hover:border-primary">
            <div className="w-full h-24 bg-[#1e293b] border rounded-md mb-2"></div>
            <p className="text-center">Dark</p>
          </div>
          <div className="border rounded-md p-3 cursor-pointer hover:border-primary">
            <div className="w-full h-24 bg-gradient-to-b from-[#f8fafc] to-[#1e293b] border rounded-md mb-2"></div>
            <p className="text-center">System</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-lg">Display Font Size</h3>
        <div className="flex items-center">
          <span className="text-sm">A</span>
          <input type="range" className="mx-4 w-full" min="1" max="5" step="1" defaultValue="3" />
          <span className="text-lg">A</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
