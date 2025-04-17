import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function Router() {
  // Get base path - useful for GitHub Pages deployment
  // Will be empty for local development and root domain
  const basePath = document.querySelector('base')?.getAttribute('href') || '/';
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/index.html" component={Home} />
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
