import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { registrationSchema } from "@/lib/validation";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Shield, Building, User } from "lucide-react";

// Registration form values type
type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  district: string;
  username: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  userType: "citizen" | "employer" | "government";
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Get user type from URL or default to citizen
  const urlParams = new URLSearchParams(window.location.search);
  const defaultUserType = (urlParams.get('type') || 'citizen') as "citizen" | "employer" | "government";
  
  // Form definition
  const form = useForm<FormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      district: "",
      username: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      userType: defaultUserType,
    },
  });
  
  // Registration mutation
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest('POST', '/api/register', data);
    },
    onSuccess: async (response) => {
      const data = await response.json();
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created successfully.",
      });
      
      // Invalidate user query to refresh user data
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      
      // Redirect to login page
      setLocation('/login');
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration. Please try again.",
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#006A4E] mb-4 text-center">Create Your Account</h1>
            <p className="text-gray-600 mb-8 text-center">
              Join the National Skills Database to connect with opportunities that match your expertise
            </p>
            
            <Tabs defaultValue={defaultUserType} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger 
                  value="citizen"
                  onClick={() => form.setValue("userType", "citizen")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Citizen
                </TabsTrigger>
                <TabsTrigger 
                  value="employer"
                  onClick={() => form.setValue("userType", "employer")}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Employer
                </TabsTrigger>
                <TabsTrigger 
                  value="government"
                  onClick={() => form.setValue("userType", "government")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Government
                </TabsTrigger>
              </TabsList>
              
              <Card>
                <CardHeader>
                  <CardTitle>
                    {form.watch("userType") === "citizen" && "Citizen Registration"}
                    {form.watch("userType") === "employer" && "Employer Registration"}
                    {form.watch("userType") === "government" && "Government Official Registration"}
                  </CardTitle>
                  <CardDescription>
                    {form.watch("userType") === "citizen" && "Register to build your skills profile and find opportunities"}
                    {form.watch("userType") === "employer" && "Register to access talent and post job opportunities"}
                    {form.watch("userType") === "government" && "Register to access policy tools and analytics"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter your email address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="district"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>District</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your district" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="dhaka">Dhaka</SelectItem>
                                  <SelectItem value="chittagong">Chittagong</SelectItem>
                                  <SelectItem value="khulna">Khulna</SelectItem>
                                  <SelectItem value="rajshahi">Rajshahi</SelectItem>
                                  <SelectItem value="sylhet">Sylhet</SelectItem>
                                  <SelectItem value="barisal">Barisal</SelectItem>
                                  <SelectItem value="rangpur">Rangpur</SelectItem>
                                  <SelectItem value="mymensingh">Mymensingh</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Choose a username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="hidden">
                          <FormField
                            control={form.control}
                            name="userType"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input type="hidden" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
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
                                    placeholder="Create a password" 
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
                        
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Confirm your password" 
                                    {...field} 
                                  />
                                  <button 
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="agreeToTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm">
                                I agree to the <a href="#" className="text-[#006A4E] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#006A4E] hover:underline">Privacy Policy</a>.
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-[#006A4E] hover:bg-[#00563F]"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-gray-600">
                    Already have an account? <a href="/login" className="text-[#006A4E] hover:underline">Sign in</a>
                  </p>
                </CardFooter>
              </Card>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
