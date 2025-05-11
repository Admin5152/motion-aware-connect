
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockSafetyTips, SafetyTip } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface TipsListProps {
  limit?: number;
  showTitle?: boolean;
}

const TipsList = ({ limit = 3, showTitle = true }: TipsListProps) => {
  const [tips, setTips] = useState(mockSafetyTips);
  
  const markAsRead = (tipId: string) => {
    setTips(tips.map(tip => 
      tip.id === tipId ? { ...tip, isRead: true } : tip
    ));
  };

  const formatTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Driving': return 'bg-app-blue-500';
      case 'Walking': return 'bg-app-success';
      case 'Flying': return 'bg-app-info';
      case 'Weather': return 'bg-app-warning';
      default: return 'bg-app-blue-300';
    }
  };

  const sortedTips = [...tips]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);

  return (
    <Card className="col-span-2">
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Safety Tips</span>
            <Badge variant="outline" className="ml-2">
              {tips.filter(tip => !tip.isRead).length} New
            </Badge>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {sortedTips.map(tip => (
          <div 
            key={tip.id} 
            className={`
              p-4 rounded-lg border transition-all
              ${tip.isRead ? 'bg-background' : 'bg-app-blue-50 dark:bg-slate-800'}
              ${tip.isRead ? 'border-border' : 'border-app-blue-200 dark:border-slate-700'}
            `}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{tip.title}</h4>
                  <Badge className={`${getCategoryColor(tip.category)} text-xs`}>
                    {tip.category}
                  </Badge>
                  {!tip.isRead && (
                    <span className="w-2 h-2 bg-app-blue-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{tip.content}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  {formatTime(tip.date)}
                </div>
              </div>
              
              {!tip.isRead && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => markAsRead(tip.id)}
                >
                  Mark read
                </Button>
              )}
            </div>
          </div>
        ))}
        
        <Button variant="ghost" className="w-full" asChild>
          <a href="/inbox">View all tips</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TipsList;
