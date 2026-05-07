// Inline SVG icons – pixel-matched to the Figma design

/* ── Stats bar icons ─────────────────────────────────────────────── */

/** Open book icon (Publications) */
export function IconPublications({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" strokeWidth="1.5" stroke="currentColor">
      <path d="M4 6h8c1.1 0 2 .9 2 2v14c0-.55-.45-1-1-1H4V6z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 6h-8c-1.1 0-2 .9-2 2v14c0-.55.45-1 1-1h9V6z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Square brackets icon (Citations) */
export function IconCitations({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" strokeWidth="1.5" stroke="currentColor">
      <path d="M9 6H6v16h3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 6h3v16h-3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Two people icon (Students) */
export function IconStudents({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" strokeWidth="1.5" stroke="currentColor">
      <circle cx="10" cy="9" r="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 22v-1c0-3.3 2.7-6 6-6s6 2.7 6 6v1" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="19" cy="9" r="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 15c2.8.5 5 3 5 5.5V22" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Calendar icon (Experience) */
export function IconExperience({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" strokeWidth="1.5" stroke="currentColor">
      <rect x="4" y="6" width="20" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="4" y1="12" x2="24" y2="12" strokeLinecap="round"/>
      <line x1="10" y1="4" x2="10" y2="8" strokeLinecap="round"/>
      <line x1="18" y1="4" x2="18" y2="8" strokeLinecap="round"/>
      <rect x="8" y="16" width="4" height="3" rx="0.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Button icons ────────────────────────────────────────────────── */

export function IconArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconDownload({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2v7M4.5 6.5 7 9l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconMail({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconQuote({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 379.51" fill="var(--gold)">
      <path d="M212.27 33.98C131.02 56.52 78.14 103.65 64.99 185.67c-3.58 22.32 1.42 5.46 16.55-5.86 49.4-36.96 146.53-23.88 160.01 60.56 27.12 149.48-159.79 175.36-215.11 92.8-12.87-19.19-21.39-41.59-24.46-66.19C-11.35 159.99 43.48 64.7 139.8 19.94c17.82-8.28 36.6-14.76 56.81-19.51 10.12-2.05 17.47 3.46 20.86 12.77 2.87 7.95 3.85 16.72-5.2 20.78zm267.78 0c-81.25 22.54-134.14 69.67-147.28 151.69-3.58 22.32 1.42 5.46 16.55-5.86 49.4-36.96 146.53-23.88 160 60.56 27.13 149.48-159.78 175.36-215.1 92.8-12.87-19.19-21.39-41.59-24.46-66.19C256.43 159.99 311.25 64.7 407.58 19.94 425.4 11.66 444.17 5.18 464.39.43c10.12-2.05 17.47 3.46 20.86 12.77 2.87 7.95 3.85 16.72-5.2 20.78z"/>
    </svg>
  );
}
