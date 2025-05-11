
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocationTracking } from '@/hooks/useLocationTracking';
import { getActivityIcon } from '@/data/mockData';

const MapView = () => {
  const { currentLocation, trackedUsers, loading, error } = useLocationTracking();

  // In a real app, we would use a mapping library like Mapbox, Google Maps, etc.
  // For now, we'll create a UI placeholder that simulates a map

  if (loading) {
    return (
      <Card className="col-span-3 row-span-2">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Location Map</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[500px] flex items-center justify-center">
          <div className="text-muted-foreground">Loading map...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="col-span-3 row-span-2">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Location Map</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[500px] flex items-center justify-center">
          <div className="text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3 row-span-2">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Location Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[500px] p-0 relative overflow-hidden">
        <div className="map-container bg-app-blue-50 relative">
          {/* In a real app, this would be a map component */}
          <div className="h-full w-full bg-gradient-to-br from-app-blue-100 to-app-blue-50 p-4">
            {/* Mock map UI */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="h-full w-full bg-app-blue-50 dark:bg-slate-800">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="w-full h-full grid grid-cols-12 grid-rows-12">
                    {Array.from({ length: 12 }).map((_, rowIndex) => (
                      Array.from({ length: 12 }).map((_, colIndex) => (
                        <div 
                          key={`${rowIndex}-${colIndex}`}
                          className="border border-app-blue-200 dark:border-slate-700"
                        />
                      ))
                    ))}
                  </div>
                </div>

                {/* User markers */}
                {trackedUsers.map((user) => {
                  const ActivityIcon = getActivityIcon(user.activity);
                  // Calculate position based on lat/lng to fit into our grid
                  const left = ((user.location.lng + 180) % 360) / 360 * 100;
                  const top = ((90 - user.location.lat) % 180) / 180 * 100;
                  
                  return (
                    <div 
                      key={user.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`
                          w-10 h-10 rounded-full border-2 border-white 
                          ${user.status === 'online' ? 'bg-app-success' : 
                            user.status === 'away' ? 'bg-app-warning' : 'bg-gray-400'}
                          shadow-md overflow-hidden
                        `}>
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-1 bg-white dark:bg-slate-800 rounded-full px-2 py-0.5 text-xs shadow-md">
                          <div className="flex items-center gap-1">
                            <ActivityIcon className="h-3 w-3 text-app-blue-500" />
                            <span>{user.name.split(' ')[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Current user location */}
                {currentLocation && (
                  <div 
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{
                      left: `${((currentLocation.lng + 180) % 360) / 360 * 100}%`,
                      top: `${((90 - currentLocation.lat) % 180) / 180 * 100}%`,
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-4 border-app-blue-500 bg-app-blue-100 shadow-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-app-blue-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="mt-1 bg-app-blue-500 text-white rounded-full px-3 py-1 text-xs shadow-md">
                        You
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
