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
 * 4. Handling case-sensitive repository names
 */
function useGitHubPagesRouting() {
  // Get base path from GitHub Pages environment if available
  const isGitHubPages = window.GITHUB_PAGES_ENV?.isGitHubPages || 
                        window.location.hostname.includes('github.io');
  const basePath = window.GITHUB_PAGES_ENV?.basePath || '';
  
  // Enhanced debugging for GitHub Pages
  if (isGitHubPages) {
    console.log('📝 GitHub Pages detected!');
    console.log('📂 Base path:', basePath);
    console.log('🔗 Full URL:', window.location.href);
    console.log('🔍 Pathname:', window.location.pathname);
    console.log('❓ Search:', window.location.search);
    
    // Handle GitHub Pages 404 redirect if needed (e.g. ?/about)
    const location = window.location;
    if (location.search.startsWith('?/')) {
      const route = location.search.replace('?/', '/');
      console.log('🔄 GitHub Pages redirect detected:', route);
      
      // Replace the URL to clean it up (optional)
      window.history.replaceState(
        null, 
        '', 
        `${basePath}${route}`
      );
      
      console.log('✅ New URL after redirect:', window.location.href);
    }
    
    // Check for case-sensitivity issues in the URL
    const repoName = 'MarkMyTech.website';
    const lowercaseRepoName = repoName.toLowerCase();
    
    if (location.pathname.includes(lowercaseRepoName) && 
        !location.pathname.includes(repoName)) {
      console.warn('⚠️ Case-sensitivity issue detected in URL!');
      console.warn('Current path uses lowercase, but GitHub Pages is case-sensitive.');
      console.warn('You should use:', repoName, 'instead of', lowercaseRepoName);
    }
  }
  
  return { isGitHubPages, basePath };
}

function Router() {
  // Use GitHub Pages routing helper
  const { isGitHubPages, basePath } = useGitHubPagesRouting();
  
  // Add special handling for the exact GitHub Pages repository path
  const repoName = 'MarkMyTech.website';
  
  // Add additional common GitHub Pages URL patterns for the repository
  const routes = [
    // Basic routes
    "/",
    "/index.html",
    
    // GitHub Pages routes with base path
    `${basePath}/`,
    `${basePath}/index.html`,
    `${basePath}`,
    
    // Specific routes for this repository (case-sensitive!)
    `/${repoName}/`,
    `/${repoName}/index.html`,
    `/${repoName}`,
    
    // Lowercase alternatives (GitHub Pages is case-sensitive, but we'll handle it anyway)
    `/${repoName.toLowerCase()}/`,
    `/${repoName.toLowerCase()}/index.html`,
    `/${repoName.toLowerCase()}`,
    
    // Special patterns GitHub Pages might use
    `/MarkMyTech.website.html`,
    `/markmytech.website.html`,
  ];
  
  console.log('🛣️ Available routes:', routes);
  
  return (
    <Switch>
      {/* Map all home routes */}
      {routes.map((route, index) => (
        <Route key={index} path={route} component={Home} />
      ))}
      
      {/* Catch all other routes */}
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
