interface Window {
  trackEvent?: (eventName: string, eventData?: Record<string, any>) => void;
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
}

// Extend the Window interface globally
declare global {
  interface Window {
    trackEvent?: (eventName: string, eventData?: Record<string, any>) => void;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}