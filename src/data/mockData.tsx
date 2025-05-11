
import { Car, Plane, FootPrints } from "lucide-react";

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: Date;
  activity: ActivityType;
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export type ActivityType = 'driving' | 'walking' | 'flying' | 'idle';

export interface LocationHistory {
  id: string;
  userId: string;
  timestamp: Date;
  location: Location;
  activity: ActivityType;
}

export interface SafetyTip {
  id: string;
  title: string;
  content: string;
  date: Date;
  isRead: boolean;
  category: string;
}

export const getActivityIcon = (activity: ActivityType) => {
  switch (activity) {
    case 'driving':
      return Car;
    case 'flying':
      return Plane;
    case 'walking':
      return FootPrints;
    default:
      return FootPrints;
  }
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
    lastSeen: new Date(),
    activity: 'driving',
    location: { lat: 37.7749, lng: -122.4194, address: 'San Francisco, CA' }
  },
  {
    id: '2',
    name: 'Taylor Swift',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'online',
    lastSeen: new Date(),
    activity: 'walking',
    location: { lat: 37.7694, lng: -122.4862, address: 'Golden Gate Park' }
  },
  {
    id: '3',
    name: 'Jordan Lee',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'away',
    lastSeen: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    activity: 'flying',
    location: { lat: 37.6213, lng: -122.3790, address: 'SFO Airport' }
  },
  {
    id: '4',
    name: 'Morgan Smith',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    activity: 'idle',
    location: { lat: 37.7837, lng: -122.4089, address: 'Union Square' }
  },
  {
    id: '5',
    name: 'Riley Kim',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'online',
    lastSeen: new Date(),
    activity: 'driving',
    location: { lat: 37.8099, lng: -122.4103, address: 'Fisherman\'s Wharf' }
  },
];

export const mockLocationHistory: LocationHistory[] = [
  {
    id: '101',
    userId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    location: { lat: 37.7749, lng: -122.4194, address: 'San Francisco Downtown' },
    activity: 'walking'
  },
  {
    id: '102',
    userId: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    location: { lat: 37.8086, lng: -122.4095, address: 'Pier 39' },
    activity: 'driving'
  },
  {
    id: '103',
    userId: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    location: { lat: 37.8199, lng: -122.4783, address: 'Golden Gate Bridge' },
    activity: 'walking'
  },
  {
    id: '104',
    userId: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    location: { lat: 37.6213, lng: -122.3790, address: 'SFO Airport' },
    activity: 'flying'
  },
  {
    id: '105',
    userId: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    location: { lat: 37.7837, lng: -122.4089, address: 'Union Square' },
    activity: 'walking'
  },
  {
    id: '106',
    userId: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    location: { lat: 37.7694, lng: -122.4862, address: 'Golden Gate Park' },
    activity: 'driving'
  },
];

export const mockSafetyTips: SafetyTip[] = [
  {
    id: '201',
    title: 'Safe Driving Tips',
    content: 'Always wear your seatbelt and avoid using your phone while driving.',
    date: new Date(),
    isRead: false,
    category: 'Driving'
  },
  {
    id: '202',
    title: 'Walking Safety',
    content: 'Stay aware of your surroundings when walking, especially at night.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    isRead: true,
    category: 'Walking'
  },
  {
    id: '203',
    title: 'Flight Preparation',
    content: 'Remember to check in online and arrive at the airport at least 2 hours before your flight.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isRead: false,
    category: 'Flying'
  },
  {
    id: '204',
    title: 'Location Sharing Best Practices',
    content: 'Only share your location with trusted family and friends.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    isRead: true,
    category: 'General'
  },
  {
    id: '205',
    title: 'Weather Alert',
    content: 'Heavy rain expected in your area tomorrow. Drive carefully!',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    isRead: false,
    category: 'Weather'
  },
];
