import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Mock analytics implementation - replace with actual analytics service
class Analytics {
  private static instance: Analytics;
  
  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    console.log('📊 Page View:', { path, title });
    
    // In a real implementation, you would send this to your analytics service
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: path });
    // Example: fbq('track', 'PageView');
    
    // Store locally for demo purposes
    const views = JSON.parse(localStorage.getItem('analytics_page_views') || '[]');
    views.push({ path, title, timestamp: new Date().toISOString() });
    localStorage.setItem('analytics_page_views', JSON.stringify(views.slice(-100))); // Keep last 100
  }

  // Track custom events
  trackEvent({ action, category, label, value }: AnalyticsEvent) {
    console.log('📊 Event:', { action, category, label, value });
    
    // In a real implementation:
    // gtag('event', action, { event_category: category, event_label: label, value });
    // fbq('track', action, { category, label, value });
    
    // Store locally for demo purposes
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push({ action, category, label, value, timestamp: new Date().toISOString() });
    localStorage.setItem('analytics_events', JSON.stringify(events.slice(-200))); // Keep last 200
  }

  // Track user engagement
  trackEngagement(element: string, action: string) {
    this.trackEvent({
      action: `${element}_${action}`,
      category: 'Engagement',
      label: element
    });
  }

  // Track conversion events
  trackConversion(type: string, value?: number) {
    this.trackEvent({
      action: 'conversion',
      category: type,
      value
    });
  }

  // Get analytics data (for dashboard)
  getAnalyticsData() {
    return {
      pageViews: JSON.parse(localStorage.getItem('analytics_page_views') || '[]'),
      events: JSON.parse(localStorage.getItem('analytics_events') || '[]')
    };
  }
}

// Hook for automatic page view tracking
export const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    const analytics = Analytics.getInstance();
    analytics.trackPageView(location.pathname, document.title);
  }, [location]);
};

// Hook for tracking custom events
export const useAnalytics = () => {
  const analytics = Analytics.getInstance();
  
  return {
    trackEvent: (event: AnalyticsEvent) => analytics.trackEvent(event),
    trackEngagement: (element: string, action: string) => analytics.trackEngagement(element, action),
    trackConversion: (type: string, value?: number) => analytics.trackConversion(type, value),
    trackPageView: (path: string, title?: string) => analytics.trackPageView(path, title)
  };
};

// Common event tracking functions
export const trackButtonClick = (buttonName: string) => {
  const analytics = Analytics.getInstance();
  analytics.trackEngagement(buttonName, 'click');
};

export const trackFormSubmit = (formName: string) => {
  const analytics = Analytics.getInstance();
  analytics.trackEvent({
    action: 'form_submit',
    category: 'Form',
    label: formName
  });
};

export const trackVideoPlay = (videoName: string) => {
  const analytics = Analytics.getInstance();
  analytics.trackEvent({
    action: 'video_play',
    category: 'Media',
    label: videoName
  });
};

export const trackSearch = (query: string, results: number) => {
  const analytics = Analytics.getInstance();
  analytics.trackEvent({
    action: 'search',
    category: 'User Action',
    label: query,
    value: results
  });
};

export const trackLanguageChange = (language: string) => {
  const analytics = Analytics.getInstance();
  analytics.trackEvent({
    action: 'language_change',
    category: 'User Preference',
    label: language
  });
};

export const trackThemeChange = (theme: string) => {
  const analytics = Analytics.getInstance();
  analytics.trackEvent({
    action: 'theme_change',
    category: 'User Preference',
    label: theme
  });
};

export default Analytics;
