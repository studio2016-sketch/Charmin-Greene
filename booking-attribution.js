(function () {
  window.wgosAttribution = function () {
  const empty = {};
  if (typeof window === 'undefined') return empty;
  const key = 'wgos_first_touch_v1';
  const privatePath = /^\/(client|proposal|sign|pay|api|discovery)(\/|$)/;
  if (privatePath.test(window.location.pathname)) return empty;
  try {
    const saved = sessionStorage.getItem(key);
    if (saved) { const first = JSON.parse(saved); if (first && typeof first === 'object' && typeof first.landingPath === 'string') return first; }
  } catch { /* Storage can be unavailable in private browsing. */ }
  const params = new URLSearchParams(window.location.search);
  let referrer = '';
  try { const u = new URL(document.referrer); if (u.origin !== window.location.origin && ['http:', 'https:'].includes(u.protocol)) referrer = u.origin; } catch {}
  const first = {
    landingPath: window.location.pathname,
    referrer,
    utmSource: (params.get('utm_source') || '').slice(0,160),
    utmMedium: (params.get('utm_medium') || '').slice(0,160),
    utmCampaign: (params.get('utm_campaign') || '').slice(0,160),
    utmContent: (params.get('utm_content') || '').slice(0,160),
    utmTerm: (params.get('utm_term') || '').slice(0,160),
    capturedAt: new Date().toISOString(),
  };
  try { sessionStorage.setItem(key, JSON.stringify(first)); } catch {}
  return first;
  };
  window.wgosAttribution();
})();
