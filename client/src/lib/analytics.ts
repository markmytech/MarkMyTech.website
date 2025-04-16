// Enhanced Analytics service for tracking user interactions and optimizing conversions

// Types for analytics data
interface EventData {
  category: string;
  action: string;
  label?: string;
  value?: number;
  attributes?: Record<string, string | number | boolean>;
}

interface ConversionData {
  conversionType: string;
  value?: number;
  revenue?: number;
  currency?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  attributes?: Record<string, string | number | boolean>;
}

interface FunnelStage {
  stage: string;
  pageSection?: string;
  previousStage?: string;
  attributes?: Record<string, string | number | boolean>;
}

interface UserMetric {
  metricType: string;
  value: number;
  unit?: string;
  attributes?: Record<string, string | number | boolean>;
}

// Session tracking 
let sessionStartTime = Date.now();
let pageVisitDuration = 0;
let lastPagePath = window.location.pathname;
let scrollDepthMarkers = [25, 50, 75, 100];
let sessionId = generateSessionId();

// Utility for sessionId
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Track general user events for analytics with enhanced data
 */
export const trackEvent = (data: EventData): void => {
  // When connecting to a real analytics service (like Google Analytics, Mixpanel, etc.),
  // this would send the event data to that service
  console.log('Analytics Event:', {
    ...data,
    timestamp: new Date().toISOString(),
    sessionId,
    pageUrl: window.location.href,
    referrer: document.referrer || 'direct'
  });
  
  // Google Analytics implementation (GA4)
  // if (typeof window.gtag !== 'undefined') {
  //   window.gtag('event', data.action, {
  //     event_category: data.category,
  //     event_label: data.label,
  //     value: data.value,
  //     ...data.attributes,
  //     session_id: sessionId
  //   });
  // }
  
  // Facebook Pixel implementation
  // if (typeof window.fbq !== 'undefined') {
  //   window.fbq('trackCustom', data.action, {
  //     category: data.category,
  //     label: data.label,
  //     value: data.value,
  //     ...data.attributes
  //   });
  // }
};

/**
 * Track page views with enhanced metadata
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  // Calculate time spent on previous page
  const now = Date.now();
  if (lastPagePath !== pagePath) {
    pageVisitDuration = now - sessionStartTime;
    
    // Track time spent on the previous page
    if (pageVisitDuration > 0) {
      trackUserMetric({
        metricType: 'time_on_page',
        value: Math.round(pageVisitDuration / 1000), // convert to seconds
        unit: 'seconds',
        attributes: { page: lastPagePath }
      });
    }
    
    // Reset for new page
    sessionStartTime = now;
    lastPagePath = pagePath;
  }
  
  console.log('Page View:', { 
    pagePath, 
    pageTitle,
    timestamp: new Date().toISOString(),
    sessionId,
    referrer: document.referrer || 'direct',
    deviceType: getDeviceType(),
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight
  });
  
  // Google Analytics implementation
  // if (typeof window.gtag !== 'undefined') {
  //   window.gtag('config', 'G-XXXXXXXXXX', {
  //     page_path: pagePath,
  //     page_title: pageTitle,
  //     session_id: sessionId
  //   });
  // }
  
  // Facebook Pixel implementation
  // if (typeof window.fbq !== 'undefined') {
  //   window.fbq('track', 'PageView', {
  //     page_path: pagePath,
  //     page_title: pageTitle
  //   });
  // }
};

/**
 * Track conversion events with enhanced conversion data
 */
export const trackConversion = (
  conversionType: string, 
  value?: number, 
  attributes?: Record<string, string | number | boolean>
): void => {
  const conversionData: ConversionData = {
    conversionType,
    value,
    source: getParameterByName('utm_source'),
    medium: getParameterByName('utm_medium'),
    campaign: getParameterByName('utm_campaign'),
    attributes
  };
  
  // Record the conversion with standard event tracking
  trackEvent({
    category: 'conversion',
    action: conversionType,
    value,
    attributes: {
      ...attributes,
      sessionId,
      conversion_id: `conv_${Date.now()}`,
      utm_source: conversionData.source || 'direct',
      utm_medium: conversionData.medium || 'none',
      utm_campaign: conversionData.campaign || 'none'
    }
  });
  
  console.log('Conversion:', conversionData);
  
  // Google Analytics conversion tracking
  // if (typeof window.gtag !== 'undefined') {
  //   window.gtag('event', 'conversion', {
  //     send_to: 'G-XXXXXXXXXX/abcDEF123ghi',
  //     value: value,
  //     currency: 'USD',
  //     transaction_id: `conv_${Date.now()}`,
  //     ...attributes
  //   });
  // }
  
  // Facebook Pixel conversion tracking
  // if (typeof window.fbq !== 'undefined') {
  //   window.fbq('track', 'Lead', {
  //     value: value,
  //     currency: 'USD',
  //     ...attributes
  //   });
  // }
};

/**
 * Track funnel progression stages
 */
export const trackFunnelStage = (data: FunnelStage): void => {
  // Use this to track a user's progression through your conversion funnel
  console.log('Funnel Stage:', {
    ...data,
    timestamp: new Date().toISOString(),
    sessionId,
    pageUrl: window.location.href
  });
  
  // Standard event tracking for funnel stages
  trackEvent({
    category: 'funnel',
    action: `funnel_stage_${data.stage}`,
    label: data.pageSection,
    attributes: {
      ...data.attributes,
      previous_stage: data.previousStage,
      funnel_progression: data.stage
    }
  });
  
  // Google Analytics funnel tracking
  // if (typeof window.gtag !== 'undefined') {
  //   window.gtag('event', 'funnel_progression', {
  //     funnel_stage: data.stage,
  //     previous_stage: data.previousStage,
  //     page_section: data.pageSection,
  //     ...data.attributes
  //   });
  // }
};

/**
 * Track user metrics (time spent, scroll depth, etc.)
 */
export const trackUserMetric = (data: UserMetric): void => {
  console.log('User Metric:', {
    ...data,
    timestamp: new Date().toISOString(),
    sessionId,
    pageUrl: window.location.href
  });
  
  // Google Analytics user metrics
  // if (typeof window.gtag !== 'undefined') {
  //   window.gtag('event', data.metricType, {
  //     value: data.value,
  //     metric_unit: data.unit,
  //     ...data.attributes
  //   });
  // }
};

/**
 * Track A/B test variants viewed
 */
export const trackExperimentView = (
  experimentId: string, 
  variantId: string, 
  attributes?: Record<string, string | number | boolean>
): void => {
  trackEvent({
    category: 'experiment',
    action: 'experiment_view',
    label: experimentId,
    attributes: {
      ...attributes,
      experiment_id: experimentId,
      variant_id: variantId
    }
  });
  
  // Google Analytics experiments
  // if (typeof window.gtag !== 'undefined') {
  //   window.gtag('event', 'experiment_view', {
  //     experiment_id: experimentId,
  //     variant_id: variantId,
  //     ...attributes
  //   });
  // }
};

/**
 * Initialize enhanced analytics tracking services
 */
export const initAnalytics = (): void => {
  // Setup event listeners for data-analytics elements
  document.addEventListener('click', handleAnalyticsClick);
  
  // Setup scroll depth tracking
  initScrollDepthTracking();
  
  // Setup form tracking
  initFormTracking();
  
  // Setup exit intent tracking
  initExitIntentTracking();
  
  // Track initial page view
  trackPageView(window.location.pathname);
  
  // Track session start as funnel stage
  trackFunnelStage({
    stage: 'session_start',
    attributes: {
      landing_page: window.location.pathname,
      referrer: document.referrer || 'direct'
    }
  });
  
  // Track when users leave the site (beforeunload)
  window.addEventListener('beforeunload', () => {
    const pageVisitDuration = Date.now() - sessionStartTime;
    trackUserMetric({
      metricType: 'session_duration',
      value: Math.round(pageVisitDuration / 1000), // convert to seconds
      unit: 'seconds'
    });
  });
  
  console.log('Enhanced Analytics initialized');
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
      
      // Add page section context if available
      const section = findPageSection(analyticsElement);
      if (section) {
        dataset.pageSection = section;
      }
      
      // Track the element click as an event
      trackEvent({
        category: 'interaction',
        action: analyticsType,
        label: analyticsElement.textContent?.trim() || undefined,
        attributes: dataset as Record<string, string>
      });
      
      // Track as conversion for important CTAs
      if (
        analyticsType === 'package-cta' || 
        analyticsType === 'contact-form-submit' ||
        analyticsType === 'consultation-booking'
      ) {
        trackConversion(analyticsType, undefined, dataset as Record<string, string>);
        
        // Also track as funnel stage progression
        let funnelStage = '';
        switch (analyticsType) {
          case 'package-cta':
            funnelStage = 'selected_package';
            break;
          case 'contact-form-submit':
            funnelStage = 'submitted_contact';
            break;
          case 'consultation-booking':
            funnelStage = 'booked_consultation';
            break;
          default:
            funnelStage = 'engaged';
        }
        
        trackFunnelStage({
          stage: funnelStage,
          pageSection: dataset.pageSection as string,
          attributes: dataset as Record<string, string>
        });
      }
      
      // Track specific interaction types for other elements
      if (analyticsType === 'nav-link') {
        trackUserMetric({
          metricType: 'navigation',
          value: 1,
          attributes: dataset as Record<string, string>
        });
      }
      
      if (analyticsType === 'social-link-click') {
        trackUserMetric({
          metricType: 'social_engagement',
          value: 1,
          attributes: {
            platform: dataset.platform as string,
            url: (analyticsElement as HTMLAnchorElement).href
          }
        });
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

/**
 * Find the page section this element belongs to
 */
const findPageSection = (element: HTMLElement): string | null => {
  let currentElement = element;
  
  // Check for section id on parents
  while (currentElement && currentElement !== document.body) {
    if (currentElement.id) {
      return currentElement.id;
    }
    
    // Check for section[id] ancestors
    if (currentElement.tagName === 'SECTION' && currentElement.id) {
      return currentElement.id;
    }
    
    currentElement = currentElement.parentElement as HTMLElement;
  }
  
  return null;
};

/**
 * Initialize scroll depth tracking
 */
const initScrollDepthTracking = (): void => {
  let scrollTimeout: number | undefined;
  
  window.addEventListener('scroll', () => {
    // Debounce scroll events
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = window.setTimeout(() => {
      // Calculate scroll depth as percentage
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = Math.min(100, Math.floor((scrolled / scrollHeight) * 100));
      
      // Track specific scroll depth milestones
      for (let i = 0; i < scrollDepthMarkers.length; i++) {
        const marker = scrollDepthMarkers[i];
        if (scrollPercentage >= marker) {
          // Only track each marker once per page view
          scrollDepthMarkers.splice(i, 1);
          i--;
          
          trackUserMetric({
            metricType: 'scroll_depth',
            value: marker,
            unit: 'percent',
            attributes: {
              page: window.location.pathname
            }
          });
          
          if (marker >= 50) {
            // Consider content engagement at 50% scroll
            trackFunnelStage({
              stage: 'content_engaged',
              attributes: {
                scroll_depth: marker
              }
            });
          }
        }
      }
    }, 250); // Debounce time
  });
};

/**
 * Initialize form tracking
 */
const initFormTracking = (): void => {
  // Track form field interactions
  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
      const form = target.closest('form');
      if (form) {
        const formId = form.id || 'unknown_form';
        const fieldName = (target as HTMLInputElement).name || 'unnamed_field';
        const fieldType = (target as HTMLInputElement).type || 'text';
        
        trackEvent({
          category: 'form_interaction',
          action: 'field_focus',
          label: `${formId} - ${fieldName}`,
          attributes: {
            form_id: formId,
            field_name: fieldName,
            field_type: fieldType
          }
        });
      }
    }
  });
  
  // Track when users start filling out forms
  document.addEventListener('input', (event) => {
    const target = event.target as HTMLElement;
    if ((target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && !(target as HTMLInputElement).dataset.trackedInput) {
      (target as HTMLInputElement).dataset.trackedInput = 'true';
      
      const form = target.closest('form');
      if (form) {
        const formId = form.id || 'unknown_form';
        trackFunnelStage({
          stage: 'form_started',
          pageSection: findPageSection(form),
          attributes: {
            form_id: formId
          }
        });
      }
    }
  });
};

/**
 * Initialize exit intent tracking (tracks when users are about to leave)
 */
const initExitIntentTracking = (): void => {
  // Track mouse leaving the viewport at the top
  document.addEventListener('mouseleave', (event) => {
    if (event.clientY <= 5) { // User is moving cursor toward the browser UI
      trackEvent({
        category: 'user_behavior',
        action: 'exit_intent',
        attributes: {
          page: window.location.pathname,
          time_on_page: Math.round((Date.now() - sessionStartTime) / 1000)
        }
      });
    }
  });
};

/**
 * Get UTM parameters from URL
 */
const getParameterByName = (name: string): string | null => {
  const url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Get the user's device type
 */
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

export default {
  trackEvent,
  trackPageView,
  trackConversion,
  trackFunnelStage,
  trackUserMetric,
  trackExperimentView,
  initAnalytics
};