
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Bell } from 'lucide-react';
import TipsList from '@/components/inbox/TipsList';
import BackButton from '@/components/navigation/BackButton';

const Inbox = () => {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-3xl font-bold">Inbox</h1>
        </div>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="messages">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="safety-tips">
            <Bell className="mr-2 h-4 w-4" />
            Safety Tips
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>View and manage your conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No messages yet</h3>
                <p className="text-muted-foreground mt-2">
                  When you receive messages, they will appear here.
                </p>
                <Button className="mt-4">Start new conversation</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety-tips" className="space-y-4">
          <TipsList showTitle={false} limit={10} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inbox;
