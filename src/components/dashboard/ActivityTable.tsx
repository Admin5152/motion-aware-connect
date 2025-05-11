
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  mockLocationHistory, 
  mockUsers, 
  getActivityIcon, 
  LocationHistory 
} from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface ActivityTableProps {
  limit?: number;
}

const ActivityTable = ({ limit = 5 }: ActivityTableProps) => {
  const [historyItems] = useState(mockLocationHistory);
  
  const getUserName = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const getUserAvatar = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    return user ? user.avatar : '';
  };

  const formatTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const sortedHistory = [...historyItems].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  ).slice(0, limit);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedHistory.map((item: LocationHistory) => {
              const ActivityIcon = getActivityIcon(item.activity);
              
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img 
                        src={getUserAvatar(item.userId)} 
                        alt={getUserName(item.userId)}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-medium">{getUserName(item.userId)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {item.location.address || 'Unknown location'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <ActivityIcon className="h-4 w-4 text-app-blue-500" />
                      <span className="capitalize">{item.activity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatTime(item.timestamp)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActivityTable;
