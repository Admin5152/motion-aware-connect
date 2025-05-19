
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LogIn, User, Key, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/sonner';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // This is a mock authentication function
    // In a real app, you'd connect this to your backend authentication service
    if (data.email === 'demo@example.com' && data.password === 'password123') {
      // Success - show toast and redirect to dashboard
      toast.success('Login successful! Welcome back.');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      // Show error message
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 glass-card p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-app-blue-600 text-white font-bold flex items-center justify-center">
            LT
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Track locations and stay connected
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder="Email address" 
                        type="email" 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder="Password" 
                        type="password" 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-app-blue-600 hover:text-app-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              <LogIn className="mr-2 h-4 w-4" />
              {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <a onClick={() => navigate('/signup')} className="font-medium text-app-blue-600 hover:text-app-blue-500 cursor-pointer">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
