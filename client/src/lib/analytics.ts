// Analytics service for tracking user interactions and conversions

interface EventData {
  category: string;
  action: string;
  label?: string;
  value?: number;
  attributes?: Record<string, string | number | boolean>;
}

/**
 * Track user events for analytics
 */
export const trackEvent = (data: EventData): void => {
  // When connecting to a real analytics service (like Google Analytics, Mixpanel, etc.),
  // this would send the event data to that service
  console.log('Analytics Event:', data);
  
  // Example implementation for when Google Analytics is added:
  // if (window.gtag) {
  //   window.gtag('event', data.action, {
  //     event_category: data.category,
  //     event_label: data.label,
  //     value: data.value,
  //     ...data.attributes
  //   });
  // }
};

/**
 * Track page views
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  console.log('Page View:', { pagePath, pageTitle });
  
  // Example implementation for when Google Analytics is added:
  // if (window.gtag) {
  //   window.gtag('config', 'G-XXXXXXXXXX', {
  //     page_path: pagePath,
  //     page_title: pageTitle
  //   });
  // }
};

/**
 * Track conversion events (form submissions, button clicks)
 */
export const trackConversion = (
  conversionType: string, 
  value?: number, 
  attributes?: Record<string, string | number | boolean>
): void => {
  trackEvent({
    category: 'conversion',
    action: conversionType,
    value,
    attributes
  });
};

/**
 * Initialize analytics services
 */
export const initAnalytics = (): void => {
  // Setup event listeners for data-analytics elements
  document.addEventListener('click', handleAnalyticsClick);
  
  // Track initial page view
  trackPageView(window.location.pathname);
  
  console.log('Analytics initialized');
};

/**
 * Handle clicks on elements with data-analytics attributes
 */
const handleAnalyticsClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement;
  const analyticsElement = findAnalyticsElement(target);
  
  if (analyticsElement) {
    const analyticsType = analyticsElement.getAttribute('data-analytics');
    if (analyticsType) {
      // Get all data-* attributes for additional context
      const dataset = { ...analyticsElement.dataset };
      delete dataset.analytics; // Remove the main analytics type as we're using it separately
      
      trackEvent({
        category: 'interaction',
        action: analyticsType,
        label: analyticsElement.textContent?.trim() || undefined,
        attributes: dataset as Record<string, string>
      });
      
      // Track as conversion if it's a CTA
      if (
        analyticsType === 'package-cta' || 
        analyticsType === 'contact-form-submit' ||
        analyticsType === 'consultation-booking'
      ) {
        trackConversion(analyticsType, undefined, dataset as Record<string, string>);
      }
    }
  }
};

/**
 * Find the closest parent element with a data-analytics attribute
 */
const findAnalyticsElement = (element: HTMLElement | null): HTMLElement | null => {
  while (element && !element.getAttribute('data-analytics')) {
    element = element.parentElement;
  }
  return element;
};

export default {
  trackEvent,
  trackPageView,
  trackConversion,
  initAnalytics
};