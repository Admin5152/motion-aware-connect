
import { useState, useEffect } from 'react';
import { User, ActivityType, mockUsers, Location } from '../data/mockData';

interface LocationTrackingOptions {
  enableRealTimeUpdates?: boolean;
  refreshInterval?: number;
  users?: string[]; // user IDs to track
}

export function useLocationTracking(options: LocationTrackingOptions = {}) {
  const {
    enableRealTimeUpdates = true,
    refreshInterval = 10000, // 10 seconds
    users = []
  } = options;

  const [trackedUsers, setTrackedUsers] = useState<User[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate getting the user's current location
  useEffect(() => {
    const getUserLocation = () => {
      setLoading(true);
      
      // In a real app, we would use the browser's Geolocation API
      // For now, we'll simulate with a mock location
      setTimeout(() => {
        try {
          // Simulate SF location
          setCurrentLocation({
            lat: 37.7749, 
            lng: -122.4194,
            address: 'San Francisco, CA'
          });
          setLoading(false);
        } catch (err) {
          setError('Failed to get location. Please enable location services.');
          setLoading(false);
        }
      }, 1000);
    };

    getUserLocation();
  }, []);

  // Simulate getting tracked users with real-time updates
  useEffect(() => {
    if (!enableRealTimeUpdates) {
      // Just get users once
      const filteredUsers = users.length 
        ? mockUsers.filter(user => users.includes(user.id))
        : mockUsers;
      setTrackedUsers(filteredUsers);
      return;
    }

    // Set initial users
    let filteredUsers = users.length 
      ? mockUsers.filter(user => users.includes(user.id))
      : mockUsers;
    
    setTrackedUsers(filteredUsers);

    // Simulate real-time updates
    const intervalId = setInterval(() => {
      // Update user locations randomly in a real app we would get updates from a server
      const updatedUsers = filteredUsers.map(user => {
        // Small random movement
        const latChange = (Math.random() - 0.5) * 0.01;
        const lngChange = (Math.random() - 0.5) * 0.01;
        
        return {
          ...user,
          location: {
            ...user.location,
            lat: user.location.lat + latChange,
            lng: user.location.lng + lngChange
          },
          // Occasionally update activity
          activity: Math.random() > 0.9 
            ? ['driving', 'walking', 'flying', 'idle'][Math.floor(Math.random() * 4)] as ActivityType
            : user.activity
        };
      });
      
      filteredUsers = updatedUsers;
      setTrackedUsers(updatedUsers);
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [enableRealTimeUpdates, refreshInterval, users]);

  return {
    currentLocation,
    trackedUsers,
    loading,
    error,
  };
}
