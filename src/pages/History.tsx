
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockLocationHistory, mockUsers, getActivityIcon, LocationHistory, User } from '@/data/mockData';
import { format } from 'date-fns';
import BackButton from '@/components/navigation/BackButton';

const History = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>('all');
  const [historyItems, setHistoryItems] = useState(mockLocationHistory);
  
  const filteredHistory = selectedUserId === 'all' 
    ? historyItems
    : historyItems.filter(item => item.userId === selectedUserId);

  const sortedHistory = [...filteredHistory].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  const getUserName = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const getUserAvatar = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    return user ? user.avatar : '';
  };

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-3xl font-bold">Location History</h1>
        </div>
        <div className="w-64">
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a person" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Everyone</SelectItem>
              {mockUsers.map((user: User) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Timeline</CardTitle>
          <CardDescription>
            View the location history of people you're tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Date & Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedHistory.length > 0 ? (
                sortedHistory.map((item: LocationHistory) => {
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
                      <TableCell>
                        {format(item.timestamp, 'MMM dd, yyyy - h:mm a')}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No location history found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
