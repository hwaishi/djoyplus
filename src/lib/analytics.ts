import { SITE_CONFIG } from '../config/site';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export function initAnalytics() {
  if (!SITE_CONFIG.metaPixelId) return;
  try {
    if (typeof window !== 'undefined' && !window.fbq) {
      // Meta Pixel base script loader placeholder
      console.log('[ANALYTICS] Meta Pixel initialized with ID:', SITE_CONFIG.metaPixelId);
    }
  } catch (e) {
    console.error('[ANALYTICS_INIT_ERROR]', e);
  }
}

export function trackEvent(eventName: string, data?: Record<string, any>) {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, data);
    }
    console.log(`[ANALYTICS_TRACK] ${eventName}`, data || {});
  } catch (e) {
    console.error('[ANALYTICS_TRACK_ERROR]', e);
  }
}
