// Type definitions for our analytics module
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

interface ExperimentView {
  experimentName: string;
  variant: string;
  attributes?: Record<string, string | number | boolean>;
}

interface AnalyticsInterface {
  trackEvent: (data: EventData) => void;
  trackPageView: (pagePath: string, pageTitle?: string) => void;
  trackConversion: (
    conversionType: string,
    value?: number,
    attributes?: Record<string, string | number | boolean>
  ) => void;
  trackFunnelStage: (data: FunnelStage) => void;
  trackUserMetric: (data: UserMetric) => void;
  trackExperimentView: (
    experimentName: string,
    variant: string,
    attributes?: Record<string, string | number | boolean>
  ) => void;
}

// Extend Window interface to include our analytics
declare global {
  interface Window {
    analytics?: AnalyticsInterface;
  }
}

export {};