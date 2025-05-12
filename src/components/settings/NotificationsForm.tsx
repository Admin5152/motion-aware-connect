
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const notificationsFormSchema = z.object({
  locationAlerts: z.boolean().default(true),
  safetyTips: z.boolean().default(true),
  appUpdates: z.boolean().default(false),
  emailNotifications: z.boolean().default(true),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

const NotificationsForm = () => {
  const { toast } = useToast();
  
  const defaultNotificationValues: NotificationsFormValues = {
    locationAlerts: true,
    safetyTips: true,
    appUpdates: false,
    emailNotifications: true,
  };

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: defaultNotificationValues,
  });

  function onNotificationsSubmit(data: NotificationsFormValues) {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  }

  return (
    <Form {...notificationsForm}>
      <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-4">
        <div className="space-y-6">
          <FormField
            control={notificationsForm.control}
            name="locationAlerts"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Location Alerts</FormLabel>
                  <FormDescription>
                    Receive notifications when someone enters or leaves a safe area.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={notificationsForm.control}
            name="safetyTips"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Safety Tips</FormLabel>
                  <FormDescription>
                    Receive personalized safety tips and recommendations.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={notificationsForm.control}
            name="appUpdates"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">App Updates</FormLabel>
                  <FormDescription>
                    Get notified about new features and app improvements.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={notificationsForm.control}
            name="emailNotifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Email Notifications</FormLabel>
                  <FormDescription>
                    Receive important notifications via email as well as in-app.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Save Preferences</Button>
        </div>
      </form>
    </Form>
  );
};

export default NotificationsForm;
