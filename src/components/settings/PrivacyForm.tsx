
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

const privacyFormSchema = z.object({
  shareLocation: z.boolean().default(true),
  shareActivity: z.boolean().default(true),
  allowFriendRequests: z.boolean().default(true),
});

type PrivacyFormValues = z.infer<typeof privacyFormSchema>;

const PrivacyForm = () => {
  const { toast } = useToast();
  
  const defaultPrivacyValues: PrivacyFormValues = {
    shareLocation: true,
    shareActivity: true,
    allowFriendRequests: true,
  };

  const privacyForm = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: defaultPrivacyValues,
  });

  function onPrivacySubmit(data: PrivacyFormValues) {
    toast({
      title: "Privacy settings updated",
      description: "Your privacy settings have been saved.",
    });
  }

  return (
    <Form {...privacyForm}>
      <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-4">
        <div className="space-y-6">
          <FormField
            control={privacyForm.control}
            name="shareLocation"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Share Location</FormLabel>
                  <FormDescription>
                    Allow your trusted contacts to see your current location.
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
            control={privacyForm.control}
            name="shareActivity"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Share Activity</FormLabel>
                  <FormDescription>
                    Allow your activity history to be visible to trusted contacts.
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
            control={privacyForm.control}
            name="allowFriendRequests"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Friend Requests</FormLabel>
                  <FormDescription>
                    Allow people to send you friend requests.
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
          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </Form>
  );
};

export default PrivacyForm;
