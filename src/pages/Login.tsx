
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LogIn, User, Key, AlertCircle, Info } from 'lucide-react';

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
import Logo from '@/components/ui/logo';
import { Card, CardContent } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [showDescription, setShowDescription] = React.useState(true);
  
  React.useEffect(() => {
    // Auto-hide description after 10 seconds
    const timer = setTimeout(() => {
      setShowDescription(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
      // Success - show toast and update authentication state
      toast.success('Login successful! Welcome back.');
      localStorage.setItem('isLoggedIn', 'true');
      
      // Call the success callback if provided
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        // Fallback to navigate if no callback
        navigate('/');
      }
    } else {
      // Show error message
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Description section - shows on larger screens or when visible */}
      <div 
        className={`flex flex-col items-center justify-center p-8 transition-opacity duration-700 ${
          showDescription ? 'opacity-100' : 'opacity-0 md:opacity-100'
        }`}
      >
        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start space-x-2 mb-4 text-app-blue-600">
              <Info className="h-5 w-5 mt-0.5" />
              <h2 className="text-xl font-semibold">About ARGUS</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ARGUS is a comprehensive security and monitoring platform designed to keep you secure and connected.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our dashboard provides real-time alerts, activity tracking, and emergency response tools to ensure safety and visibility.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
              <p>Demo credentials:</p>
              <p>Email: demo@example.com</p>
              <p>Password: password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Login section */}
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 glass-card p-8 animate-fade-in">
          <div className="text-center">
            <div className="flex justify-center">
              <Logo size="lg" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to ARGUS
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Keeping you secure and connected
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
              
              <Button type="submit" className="w-full bg-app-blue-600 hover:bg-app-blue-700" disabled={form.formState.isSubmitting}>
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
    </div>
  );
};

export default Login;
