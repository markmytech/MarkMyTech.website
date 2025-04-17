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

/**
 * GitHub Pages Router Helper
 * 
 * This function helps handle GitHub Pages SPA routing by:
 * 1. Detecting GitHub Pages environment
 * 2. Handling 404 redirects from GitHub Pages
 * 3. Supporting repository base paths
 */
function useGitHubPagesRouting() {
  // Get base path from GitHub Pages environment if available
  const isGitHubPages = window.GITHUB_PAGES_ENV?.isGitHubPages || false;
  const basePath = window.GITHUB_PAGES_ENV?.basePath || '';
  
  // Check if we're on GitHub Pages and handle special routing
  if (isGitHubPages) {
    // Handle GitHub Pages 404 redirect if needed (e.g. ?/about)
    const location = window.location;
    if (location.search.startsWith('?/')) {
      const route = location.search.replace('?/', '/');
      console.log('GitHub Pages redirect detected:', route);
      
      // Replace the URL to clean it up (optional)
      window.history.replaceState(
        null, 
        '', 
        `${basePath}${route}`
      );
    }
  }
  
  return { isGitHubPages, basePath };
}

function Router() {
  // Use GitHub Pages routing helper
  const { isGitHubPages, basePath } = useGitHubPagesRouting();
  
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
