
import React from 'react';
import MapView from '@/components/map/MapView';
import ActivityTable from '@/components/dashboard/ActivityTable';
import TipsList from '@/components/inbox/TipsList';
import UserCard from '@/components/users/UserCard';
import { mockUsers } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MapView />
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>People You Track</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ActivityTable />
        <TipsList />
      </div>
    </div>
  );
};

export default Dashboard;
