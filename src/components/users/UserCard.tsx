
import React from 'react';
import { User, getActivityIcon } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const ActivityIcon = getActivityIcon(user.activity);
  
  const getStatusColor = () => {
    switch (user.status) {
      case 'online': return 'bg-app-success';
      case 'away': return 'bg-app-warning';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getLastSeen = () => {
    const now = new Date();
    const diff = now.getTime() - user.lastSeen.getTime();
    
    // Less than a minute ago
    if (diff < 60000) {
      return 'Just now';
    }
    // Less than an hour ago
    if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`;
    }
    // Less than a day ago
    if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`;
    }
    // Format as date
    return user.lastSeen.toLocaleDateString();
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span 
              className={cn(
                "absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full",
                getStatusColor()
              )} 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="font-medium truncate">{user.name}</h3>
              <span className="text-xs text-muted-foreground">{getLastSeen()}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
              <ActivityIcon className="h-3.5 w-3.5" />
              <span className="capitalize">{user.activity}</span>
              <span className="mx-1">•</span>
              <span className="truncate text-xs">{user.location.address}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
