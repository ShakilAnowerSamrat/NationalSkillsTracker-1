import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import DataInsights from "@/pages/data-insights";
import UserPortal from "@/pages/user-portal";
import Resources from "@/pages/resources";
import News from "@/pages/news";
import Register from "@/pages/register";
import Login from "@/pages/login";
import Profile from "@/pages/profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/data-insights" component={DataInsights} />
      <Route path="/user-portal" component={UserPortal} />
      <Route path="/resources" component={Resources} />
      <Route path="/news" component={News} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
