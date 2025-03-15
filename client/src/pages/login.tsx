import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/validation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Building, User, EyeIcon, EyeOffIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Login form values type
type FormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Get user type from URL or default to citizen
  const urlParams = new URLSearchParams(window.location.search);
  const defaultUserType = urlParams.get('type') || 'citizen';
  
  // Form definition
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  // Login mutation
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      console.log('Logging in with:', { username: data.username, password: '[REDACTED]' });
      const response = await apiRequest('POST', '/api/login', data);
      console.log('Login response status:', response.status);
      return response;
    },
    onSuccess: async (response) => {
      try {
        const data = await response.json();
        console.log('Login successful:', data);
        
        toast({
          title: "Login successful!",
          description: "You have been logged in successfully.",
        });
        
        // Invalidate user query to refresh user data
        queryClient.invalidateQueries({ queryKey: ['/api/user'] });
        
        // Redirect to profile page so user can add skills
        setLocation('/profile');
      } catch (error) {
        console.error('Error parsing login response:', error);
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Form submission handler
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#006A4E] mb-4 text-center">Sign In</h1>
            <p className="text-gray-600 mb-8 text-center">
              Access your account on the National Skills Database
            </p>
            
            <Tabs defaultValue={defaultUserType} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="citizen">
                  <User className="h-4 w-4 mr-2" />
                  Citizen
                </TabsTrigger>
                <TabsTrigger value="employer">
                  <Building className="h-4 w-4 mr-2" />
                  Employer
                </TabsTrigger>
                <TabsTrigger value="government">
                  <Shield className="h-4 w-4 mr-2" />
                  Government
                </TabsTrigger>
              </TabsList>
              
              <Card>
                <CardHeader>
                  <CardTitle>
                    {defaultUserType === "citizen" && "Citizen Login"}
                    {defaultUserType === "employer" && "Employer Login"}
                    {defaultUserType === "government" && "Government Official Login"}
                  </CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your username" {...field} />
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
                                <Input 
                                  type={showPassword ? "text" : "password"} 
                                  placeholder="Enter your password" 
                                  {...field} 
                                />
                                <button 
                                  type="button"
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="text-right">
                        <a href="#" className="text-sm text-[#006A4E] hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-[#006A4E] hover:bg-[#00563F]"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account? <a href={`/register?type=${defaultUserType}`} className="text-[#006A4E] hover:underline">Register</a>
                  </p>
                </CardFooter>
              </Card>
            </Tabs>
            
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>
                For technical assistance, please contact<br />
                <a href="mailto:support@skills.gov.bd" className="text-[#006A4E] hover:underline">support@skills.gov.bd</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
