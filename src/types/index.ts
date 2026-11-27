export interface PackageOption {
  id: string;
  name: string;
  boxes: number;
  price: number;
  originalPrice: number;
  savings: number;
  tag?: string;
  popular?: boolean;
}

export interface ReviewItem {
  name: string;
  comment: string;
  source: string;
  stars: number;
  date?: string;
}

export interface TestimonialItem {
  title: string;
  category: string;
  desc: string;
  author: string;
  videoDuration?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LeadSubmissionPayload {
  idempotencyKey: string;
  name: string;
  phone: string;
  email?: string;
  packageId?: string;
  contactAcknowledged: boolean;
  marketingOptIn?: boolean;
  ctaSource?: string;
  attribution?: Record<string, string | null>;
}
