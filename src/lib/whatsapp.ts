import { SITE_CONFIG } from '../config/site';

export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMsg = '您好，我想了解 D’ Joy Plus 的产品及优惠配套。';
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`;
}

export function openWhatsApp(customMessage?: string) {
  const url = getWhatsAppUrl(customMessage);
  window.open(url, '_blank', 'noopener,noreferrer');
}
