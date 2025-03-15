import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  district: z.string().min(1, "Please select a district"),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
});

type FormValues = z.infer<typeof formSchema>;

const UserRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Form definition
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      district: "",
      agreeToTerms: false,
    },
  });

  // Registration mutation
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      // This would normally send to the registration endpoint
      // For this demo, we'll just simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return values;
    },
    onSuccess: () => {
      toast({
        title: "Registration Initiated",
        description: "Please check your email to complete registration.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    mutation.mutate(values, {
      onSettled: () => {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <section className="py-16 bg-[#006A4E] bg-opacity-5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-[#006A4E] p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Register Your Skills</h2>
              <p className="mb-6">
                Join the national skills database and connect with opportunities matched to your skills and aspirations.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="mt-1 mr-3 h-5 w-5" />
                  <span>Create your comprehensive skills profile</span>
                </li>
                <li className="flex items-start">
                  <Check className="mt-1 mr-3 h-5 w-5" />
                  <span>Discover training opportunities to enhance your skills</span>
                </li>
                <li className="flex items-start">
                  <Check className="mt-1 mr-3 h-5 w-5" />
                  <span>Connect with employers seeking your expertise</span>
                </li>
                <li className="flex items-start">
                  <Check className="mt-1 mr-3 h-5 w-5" />
                  <span>Track your career progress and growth</span>
                </li>
              </ul>
              <div className="pt-4 border-t border-[#4C9E81]">
                <p className="text-sm opacity-80">
                  This initiative is part of the government's commitment to enhance skills development and employment opportunities across Bangladesh.
                </p>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Registration</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your mobile number" {...field} />
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
                    className="w-full bg-[#006A4E] hover:bg-[#00563F] text-white font-medium py-2 px-4 rounded-md transition duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Create Account"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account? <a href="/login" className="text-[#006A4E] hover:underline">Sign in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRegistration;
