import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import analytics, { initAnalytics } from "./lib/analytics";

// Initialize smooth scrolling
document.documentElement.style.scrollBehavior = "smooth";

// Make analytics available globally
// This allows components to track events without importing the analytics module
window.analytics = analytics;

// Initialize analytics tracking
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
