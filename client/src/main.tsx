import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initAnalytics } from "./lib/analytics";

// Initialize smooth scrolling
document.documentElement.style.scrollBehavior = "smooth";

// Initialize analytics tracking
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
