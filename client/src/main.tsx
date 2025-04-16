import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

document.documentElement.style.scrollBehavior = "smooth";

createRoot(document.getElementById("root")!).render(<App />);
