# D’ Joy Plus — Master Correction Prompt for Google AI Studio

## 1. Role and objective
Act as a senior full-stack React/TypeScript engineer, conversion-rate optimization specialist, QA engineer and marketing analytics implementation specialist. Improve the existing repository https://github.com/hwaishi/djoyplus.git (default branch `main`). Do not regenerate the website from scratch. Inspect the actual current repository before editing; the review dated 27 November 2026 is a baseline, not a substitute for inspecting newer code. Implement the changes, rather than merely describing them. Work in a development branch where supported, preserve unrelated changes, and show a diff before merging. Never force-push or expose secrets.

## 2. Non-negotiable design preservation
- Preserve the current 13-section sequence, Chinese-first copy structure, bright refreshing visual identity, spacing, existing product photography and overall layout. Preserve the brand spelling D’ Joy Plus.
- Keep the teal #008C9E, bright cyan #00C6D7, white #FFFFFF, light aqua #EAF6F7, yellow #FFD000 / existing #FFD43B, charcoal #292929 and burgundy accents. Do not replace the design system or add a new navigation architecture.
- Retain the Hero, lifestyle pain points, constipation/bloating/indigestion education, 消·排·养, DigeSEB Pro™, Fibersol-2 & IMO, multicolour fruit and vegetable extracts, French formula, company/certificates, reviews, testimonials, preparation, FAQ, pricing and final CTA. Preserve all existing sections and anchors, including any additional sections in the actual code.
- Keep the website optimized for Malaysian Chinese adults, particularly ages 50–80. Use simplified Chinese for UI. Use authentic approved product assets. Do not redraw packaging, fabricate endorsements or replace the real logo with a generated logo.
- Do not introduce decorative icons on Hero CTA buttons; retain the text CTA and visual hierarchy. Keep the remaining layout intact. Changes to copy are restricted to accuracy, accessibility, conversion clarity, and compliance.

## 3. Audit and baseline
Inspect `src/App.tsx`, `src/main.tsx`, `src/index.css`, `index.html`, `package.json`, `vite.config.ts`, `tsconfig.json`, `.env.example`, `.gitignore` and `public/assets`. Inventory all CTA handlers, image URLs, modal states, package definitions, external URLs and form behavior. Record baseline screenshots if a browser is available. Inspect dependency versions and current runtime compatibility; do not assume the baseline versions are still current. Keep working functionality. Use the existing package manager; generate its lockfile and commit it. Do not claim a test passed unless executed.

## 4. Fix product image paths and performance
- Replace `/public/assets/...` browser URLs with deployment-aware URLs referencing `assets/...` from Vite's public root (use `import.meta.env.BASE_URL` if hosting under a subpath). Verify the three existing JPG assets resolve in production: `D_Joy_Plus_botanical_sachets_4b889186.jpg`, `D_Joy_Plus_six-angle_product_reference_c94ed8f7.jpg`, `D_Joy_Plus_Sachet_Multi-Angle_Showcase_2346ad53.jpg`.
- Convert these images to optimized WebP/AVIF if tooling is available, preserving labels, colour and proportions. Target roughly 150–300 KB each where quality permits; retain originals outside the served bundle when useful. Do not create references to nonexistent files.
- Give Hero image eager loading and high fetch priority; give below-fold images lazy loading and async decoding; specify intrinsic dimensions or aspect ratios to prevent layout shift. Use responsive image sizes where possible.
- Replace unstable third-party lifestyle photos only when authentic licensed alternatives are available; otherwise retain existing usable images with attribution if required and a graceful fallback. Avoid additional blocking scripts or unnecessary animation. Respect reduced motion.
- Move the master prompt markdown out of `public/` into a non-served docs directory, or remove it from deployment artifacts. It must not be publicly served. Review whether it should remain in a public repository at all; do not rewrite Git history without authorization.

## 5. Production configuration and secrets
Create a typed configuration module. Public frontend variables may include `VITE_WHATSAPP_NUMBER`, `VITE_META_PIXEL_ID`, `VITE_SITE_URL`, `VITE_LEAD_API_URL` (default same-origin `/api/leads`). Server-only secrets: `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` or managed workload identity, optional `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET`, optional `META_CAPI_ACCESS_TOKEN`, `META_DATASET_ID`. Never prefix secrets with VITE_, embed them in frontend code, log them, or commit real values. Use AI Studio Secrets or the deployment provider's secret manager. Keep `.env.example` placeholders and `.gitignore` rules; scan tracked files for exposed credentials. Remove unused Gemini/Express dependencies only after verifying their usage and deployment needs. Do not request a Gemini API key for a landing page that does not use Gemini.

## 6. WhatsApp CTA
Replace `601112345678` with a configurable, verified official Malaysian sales number in international digits without `+`, spaces or punctuation. Do not invent the number. If absent, disable affected CTAs gracefully and surface a configuration warning in development. Build the `https://wa.me/<number>?text=<encoded message>` URL with URL encoding. Use a direct user-initiated link or same-tab navigation; remove delayed `window.open` calls. If opening a new tab, use `noopener noreferrer`. Keep distinct CTA origins (hero, header, pricing, sticky footer, lead success, testimonial) for analytics. Default message: `您好，我想了解 D’ Joy Plus 的产品及优惠配套。` Package-specific message includes selected package and price; no need to include customer phone/email again in the URL. Do not claim a chat was sent merely because the link opened.

## 7. Functional lead form and customer journey
Retain the existing modal and design. Add name (required), Malaysian WhatsApp phone (required), email (optional by default to reduce friction; configurable if business requires it), selected package, price display, privacy notice link and explicit acknowledgement for requested contact. Separate optional marketing opt-in from responding to this inquiry. No pre-ticked boxes. Do not collect medical history or symptom selections as required fields.

Normalize Malaysian mobile numbers to +60 format using a tested phone parser or robust validation supporting 01x and international formats. Reject malformed numbers without rejecting valid Malaysian mobile formats; validate email when supplied, limit lengths, trim text, support Chinese names, show inline errors. Add `autocomplete`, accessible labels and input modes. Preserve data on errors. Disable submit while pending; show loading and a retryable error. Use an idempotency key generated once per submission attempt and reused on retries. Prevent duplicate rows on double-click and ambiguous network retries. Generate lead ID server-side. Never display `提交成功` before confirmed persistence. On success show `资料已提交，我们的客服将与您联系。` and a clear user-clicked WhatsApp button. Do not imply an order or payment was confirmed. Use `提交咨询` rather than `确认订单` unless a real order flow exists.

### Required flow
1. Customer selects package or opens consultation form.
2. Validate and submit to secure HTTPS API.
3. Backend validates, derives package/price from trusted catalog, checks idempotency, persists lead.
4. Return confirmed lead ID; only then show success and optionally emit eligible analytics.
5. Customer chooses to open WhatsApp; sales team can still access lead even if customer exits.

## 8. Backend API and Google Sheets
Implement `POST /api/leads` on a server runtime supported by the chosen deployment (e.g. Express on a supported Node runtime, or a provider serverless function). Vite alone is not a production backend. Do not build a frontend-only mock, expose a Sheets service account or use `fetch(..., {mode:'no-cors'})` as evidence of successful persistence. For AI Studio full-stack deployment ensure the API is actually routed in both preview and production; if using static hosting, provide a separate backend and document how to connect it. Prefer same-origin routing; otherwise restrict CORS to configured website origins.

Example request schema (validate strictly):
```json
{
  "idempotencyKey": "uuid",
  "name": "Customer name",
  "phone": "+60123456789",
  "email": null,
  "packageId": "pkg-2",
  "contactAcknowledged": true,
  "marketingOptIn": false,
  "ctaSource": "pricing",
  "attribution": {"utm_source":"facebook","utm_medium":"paid_social","utm_campaign":"december","utm_content":"creative_a","utm_term":null}
}
```
For general inquiries allow a null package ID or explicit inquiry type. Never trust prices, timestamps, permissions or success flags supplied by the browser. Reject unexpected fields and oversized payloads. Add rate limiting, bot protection/honeypot, request timeout, safe error responses, minimal redacted logging and CSRF/origin protections as appropriate. No public endpoint should expose stored leads.

Use Google Sheets API server-side with a least-privilege service identity shared only on the designated spreadsheet. Store dates in Asia/Kuala_Lumpur (+08:00) with unambiguous timestamps. Proposed worksheet `Leads` headers (map by header name and preserve existing columns if using an existing sheet):

| Column | Field |
|---|---|
| A | Lead ID |
| B | Created At (MYT) |
| C | Name |
| D | Phone |
| E | Email |
| F | Package ID |
| G | Package Name |
| H | Package Price (MYR) |
| I | CTA Source |
| J | UTM Source |
| K | UTM Medium |
| L | UTM Campaign |
| M | UTM Content |
| N | UTM Term |
| O | Contact Acknowledgement |
| P | Marketing Opt-in |
| Q | Lead Status (New) |
| R | Remarks |
| S | Idempotency Key |

Use `RAW` value input to avoid formula injection and preserve phone numbers as text. Escape formula-like cells for any later CSV export. Restrict spreadsheet sharing and access. For reliable deduplication across concurrent instances, use a durable store with a unique idempotency constraint and a retry/reconciliation mechanism for Sheets sync (do not rely on an in-memory map or non-atomic check-then-append). Prefer a durable lead record plus an outbox, with idempotent Sheets upsert/reconciliation by lead ID. Report success only once the durable lead is safely stored; if the requirement is immediate Sheets confirmation, return success only after the sheet write is confirmed. Explicitly distinguish pending sync from confirmed sheet delivery. If infrastructure is unavailable, mark integration incomplete rather than simulating success.

Success response: HTTP 201 `{"success":true,"leadId":"...","sheetStatus":"synced"}`; duplicate confirmed submission may return HTTP 200 with same lead ID; validation 400; throttling 429; transient persistence failure 503 with safe retry message. Document any pending-sync response separately. Do not return customer PII in responses. Configure alerting or operational visibility for failed syncs.

Optional future 2NDU CRM integration: implement an isolated disabled-by-default server adapter with signed webhook, timeout, retries and delivery status. Do not invent 2NDU API endpoints or assume capabilities. Activate only after official credentials and documentation are supplied. Never let CRM failure erase a captured lead.

## 9. Meta Pixel, UTM and conversion tracking
Implement a single typed analytics module, initialized once only when configured and permitted by consent/preferences. Do not hardcode a Pixel ID. Use Meta Pixel base code correctly; avoid duplicate initialization and duplicate PageView from React remounts. Add a consent-aware mechanism with analytics off until appropriate permission is obtained. Do not send PII, symptoms, diagnoses, medical concerns, symptom-specific categories, sensitive URL parameters, or product/package identifiers that reveal health information to Meta. Do not use advanced matching by default. Check actual Meta dataset/data-source restrictions for health and wellness before enabling any conversion event, audience or CAPI integration; if restricted, keep those events disabled, do not rename or proxy them to evade restrictions. Use internal first-party aggregate reporting instead. Sanitize URLs and referrers; ensure automatic event detection does not capture form data or sensitive content. Do not transmit raw lead IDs or user data as custom event parameters.

Subject to platform permission and consent, implement:
| Action | Event | Trigger |
|---|---|---|
| Landing page loaded | PageView | Once per actual page view |
| General product content viewed | ViewContent | Only if permitted; once per meaningful view |
| WhatsApp CTA clicked | Contact | Actual outbound click; not proof of chat |
| Package selected | SelectPackage (custom) | Actual selection; internal-only by default |
| Lead saved | Lead | Confirmed successful persistence, once per lead, only if permitted |
| Genuine checkout starts | InitiateCheckout | Only if real checkout exists and event permitted |
| Paid/confirmed order | Purchase | Only authoritative order confirmation, permitted, MYR value |

Do not fire Purchase or InitiateCheckout for inquiry form opens or WhatsApp clicks. Optional CAPI must be server-only, consent-aware, policy-eligible and use a matching event_id for browser/server deduplication. Do not implement fake purchase data. Maintain a separate internal funnel for page view, CTA click, form open, form submit attempt, successful lead and actual order; no sensitive data in external telemetry. Capture allowlisted UTM values on initial visit (bounded length, sanitized); retain through form submission using appropriate session storage/consent. Never place lead PII in query strings. Use Meta Events Manager Test Events only with test data and verified allowed events. Report events that remain disabled and why.

## 10. Authentic product content and evidence
- Remove or hide the six hardcoded reviews labelled Google/Facebook unless each has an authentic approved source. Store reviews in a typed data module with source URL, display name (consent-approved), date, rating and verified flag. Render only approved records; hide empty section content gracefully while preserving section position in the design configuration. Never fabricate reviews or ratings.
- Replace the text-only video modal with a real accessible video player or approved privacy-aware embed. Add typed testimonial data (title, thumbnail, source URL, captions, consent status). Suggested materials: Mr. Tay, Benny Chia and approved female customer testimonials. Do not invent ages, quotes, links or results. Play only user-selected video, no forced autoplay; provide captions, close/escape controls, pause on close and fallback for unavailable video. Hide play buttons for missing media.
- Add actual preparation video to existing usage section when provided. Until then show verified text steps and product photo, without a fake play button.
- Add approved company details and genuine certificate assets (KKM-related documentation, Halal, ISO as applicable). Verify holder, scope, expiry and product applicability before display. Do not imply government approval, certification or endorsement beyond documentation. Do not generate certification logos or certificates.
- Replace temporary D+ logo with the approved official logo only when supplied. Maintain original brand styling until then.
- Verify French formula wording (do not equate formulated in France with manufactured in France), DigeSEB Pro™, Fibersol-2 & IMO, ingredient claims, net weight, sachet count, directions, water volume, timing and dosage against approved product label/FAQ. Remove unsupported claims such as `温和无腹痛`, `安全顺畅不绞痛`, guaranteed bowel movement timelines or therapeutic claims. Use restrained wording such as `支持日常消化与膳食纤维摄取` when supported. Keep individual-results disclaimer; do not use disclaimer to justify unsupported promises. Confirm applicable Malaysian advertising/product requirements with the business's compliance owner before publishing.

## 11. Configurable pricing
Extract pricing into a typed shared catalog with stable IDs, active flags, price in integer sen or validated MYR amounts, box quantity, regular price, optional approved promo text and effective dates in Asia/Kuala_Lumpur. Use one authoritative catalog for display and server validation. Calculate savings and per-box cost from values; do not maintain inconsistent duplicate savings fields.

| ID | Package | Boxes | Price MYR | Regular MYR | Savings MYR |
|---|---|---:|---:|---:|---:|
| pkg-1 | 体验装 | 1 | 168 | 168 | 0 |
| pkg-2 | 热销推荐装 | 2 | 288 | 336 | 48 |
| pkg-3 | 3盒装 | 3 | 414 | 504 | 90 |
| pkg-4 | 买4送2 | 6 | 672 | 1008 | 336 |
| pkg-5 | 买8送4 | 12 | 1240 | 2016 | 776 |

Default recommended package remains pkg-2. Upgrade copy `只需多加 RM120，就能多拿1盒！` is mathematically correct. Preserve current cards; avoid implying clinical treatment with package names. Implement configurable campaign windows for 双12 / Christmas / CNY but do not activate invented dates, discounts, gifts, stock limits or expired offers. Verify free shipping, COD and any add-on offer with business before display. If price changes between page load and submission, return current price and request reconfirmation. No payment or order confirmation functionality unless explicitly configured.

## 12. Mobile UX and accessibility
Keep the visual composition while improving readability for older users. Aim for body text 16–18px on mobile, major CTA text 18px and touch targets at least 44×44px. Maintain accessible text contrast, visible focus, proper semantic headings, Chinese labels, descriptive alt text and reduced-motion behavior. Avoid horizontal overflow at 320, 360, 375, 390, 414 and 768px. Check desktop widths 1024 and 1440px. Ensure sticky top banner/header and bottom CTA do not overlap content, anchor targets, modal controls or safe areas; use scroll margin and safe-area padding. Modal must use accessible dialog semantics, focus trap, Escape close, return focus, body scroll lock, and usable layout when mobile keyboard is open. Add error announcements and status live regions. FAQ controls must expose expanded state. Maintain actual functionality for all navigation and CTA links.

## 13. Privacy and security
Add a Chinese-first privacy notice with an English version if required, using company-approved details: data controller/contact, collection purpose, fields, recipients/processors, retention, access/correction and withdrawal contact, marketing choice, cookies/analytics and applicable cross-border transfers. Do not invent legal entity address, contact details or retention commitments; list missing approvals and keep release blocked until final notice is supplied. Design for Malaysia PDPA compliance, but do not claim legal compliance without review. Protect lead data using HTTPS, least privilege, private Sheets access and redacted logs. Never store lead PII in localStorage, analytics, browser console or public GitHub. Implement basic security headers via actual hosting configuration (CSP compatible with approved media/analytics, nosniff, referrer policy, frame restrictions where appropriate). Verify no exposed secrets in built assets. Review dependencies and audit results without blindly applying breaking upgrades.

## 14. SEO and social sharing
Change HTML language from `en` to `zh-Hans-MY` (or `zh-Hans` if appropriate). Retain accurate Chinese title and description. Add canonical URL and OG URL/image only when the production URL and approved share image are configured; include OG image alt and dimensions and Twitter card metadata. Use real favicon/brand assets. Add appropriate robots directives and sitemap for final public domain if needed; keep staging noindex. Do not add fabricated AggregateRating or unsupported medical structured data. Use semantic headings with one main H1 and logical section headings. Check link previews using real assets.

## 15. Refactoring and project structure
Gradually split the existing 1,331-line `App.tsx` into logical components without altering rendered output. Suggested structure (adapt to actual repo):
```text
src/
  App.tsx
  components/ (Header, Hero, LeadModal, VideoModal, StickyCTA, Footer)
  sections/ (existing section components in existing order)
  config/ (public site configuration)
  data/ (packages, reviews, testimonials, FAQ)
  lib/ (analytics, attribution, whatsapp, validation, leadApi)
  types/
server/ or api/ (lead endpoint, validation, persistence, Sheets, optional CRM)
shared/ (trusted catalog and schemas where appropriate)
tests/
public/assets/
docs/ (non-served setup and master prompt)
```
Remove unused states/imports only after verifying no behavior depends on them. Keep TypeScript strictness and avoid `any` shortcuts. Use stable IDs, accessible reusable controls and typed API responses. Keep dependency footprint minimal. Ensure build config works in real production runtime; do not use AI Studio preview-only asset workarounds unnecessarily.

## 16. Testing and production acceptance
Add appropriate unit/integration tests and browser end-to-end tests where runtime permits. Use a separate test worksheet or mocked service in tests; do not populate real customer data with fake leads. Run package installation using the lockfile, typecheck (`npm run lint` if it invokes tsc), production build (`npm run build`), tests and production preview. Verify supported Node version and actual deploy start command, API routes and environment settings. Document commands and actual outputs; mark unexecuted checks honestly.

Acceptance checklist:
- [ ] Existing visual design and section order preserved; compare screenshots when possible.
- [ ] All three product images load from production paths; no missing assets or broken links.
- [ ] All CTA buttons work with approved WhatsApp number; no delayed popup.
- [ ] Empty/invalid lead rejected with helpful errors; optional email behaves correctly.
- [ ] Valid test lead persisted with all mapped columns and authoritative package price.
- [ ] Double click, retry and concurrent duplicate attempts do not duplicate lead records.
- [ ] Sheets failure does not generate false success; pending sync/retry behaves as documented.
- [ ] Success modal appears only after confirmed persistence; WhatsApp opens on user click.
- [ ] UTM captured correctly; no PII in URLs or analytics.
- [ ] Eligible Meta events fire once only, consent respected, restricted events remain disabled.
- [ ] No fake purchases, reviews, ratings, certificates or video players.
- [ ] Approved video playback and captions work when assets supplied.
- [ ] Pricing and savings correct, package IDs consistent, expired promotions not displayed.
- [ ] Mobile layouts, keyboard, focus, modals and sticky bars tested.
- [ ] Privacy notice approved; no sensitive information exposed in bundle or logs.
- [ ] Typecheck, build and relevant tests pass; no unresolved critical production bugs.

## 17. Required deliverables and deployment handoff
Implement changes in priority order: (1) assets and real lead capture, (2) WhatsApp and privacy, (3) eligible tracking, (4) authentic media and content, (5) performance/refactoring/QA. Do not delete functioning sections merely because external assets are missing; hide unverified records or use truthful neutral empty states. Do not pretend external systems are connected.

Provide a final implementation report with: changed files and rationale; resolved issues by severity; actual test results; remaining blockers; environment variables categorized public/server-only; Google Sheets setup instructions (create/select sheet, share with service identity, configure secrets, test row); Meta setup instructions (verify dataset restrictions and consent, configure eligible events, test); WhatsApp configuration; deployment commands and rollback notes; Git branch/commit/diff information. Add a clear README for ongoing maintenance. Do not merge or deploy automatically unless authorized.

### Inputs required from business owner before production activation
- Official WhatsApp number in international digits.
- Target Google Sheet ID, existing headers if applicable, and securely configured service identity credentials (never paste private keys into chat or source code).
- Meta Pixel/dataset ID and confirmed eligible event configuration; optional CAPI only if permitted.
- Approved official product logo, actual review sources, testimonial videos/thumbnails/captions, preparation video and certificate documents.
- Verified product label/dosage, approved offer terms, final privacy notice and production domain.
- Optional official 2NDU integration documentation and secure credentials.

If an input is missing, implement a safe configurable interface and clearly state the missing dependency. No invented values, fake integrations, fake customer content or success messages. Preserve the existing landing page design throughout.
