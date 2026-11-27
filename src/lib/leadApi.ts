import { SITE_CONFIG } from '../config/site';
import { LeadSubmissionPayload } from '../types';

export async function submitLead(payload: Omit<LeadSubmissionPayload, 'idempotencyKey'>): Promise<{ success: boolean; leadId?: string; error?: string }> {
  const idempotencyKey = `IDEMP-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // Capture UTM parameters from URL search params
  const urlParams = new URLSearchParams(window.location.search);
  const attribution = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term'),
  };

  try {
    const response = await fetch(SITE_CONFIG.leadApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        idempotencyKey,
        attribution,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return { success: false, error: data.error || '提交失败，请稍后重试' };
    }

    return { success: true, leadId: data.leadId };
  } catch (err: any) {
    console.error('[SUBMIT_LEAD_ERROR]', err);
    return { success: false, error: '网络连接异常，请检查网络后重试或直接联系 WhatsApp 客服' };
  }
}
