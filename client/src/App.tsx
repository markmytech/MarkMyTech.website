import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

// Declare the GitHub Pages environment variable for TypeScript
declare global {
  interface Window {
    GITHUB_PAGES_ENV?: {
      basePath: string;
      isGitHubPages: boolean;
    };
  }
}

function Router() {
  // Get base path from GitHub Pages environment if available
  const isGitHubPages = window.GITHUB_PAGES_ENV?.isGitHubPages || false;
  const basePath = window.GITHUB_PAGES_ENV?.basePath || '';
  
  // GitHub Pages specific handling
  if (isGitHubPages) {
    // Handle GitHub Pages 404 redirect if needed
    const location = window.location;
    if (location.search.includes('?/')) {
      const route = location.search.replace('?/', '/');
      console.log('GitHub Pages redirect detected:', route);
    }
  }
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/index.html" component={Home} />
      {/* Add additional routes for common GitHub Pages paths */}
      <Route path={`${basePath}/`} component={Home} />
      <Route path={`${basePath}/index.html`} component={Home} />
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
