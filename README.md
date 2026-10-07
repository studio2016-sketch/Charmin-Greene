# Charmin Greene — Production Website

Production source for the official CharminGreene.com website.

## Current production architecture
- Hosted on Vercel from the `main` branch.
- Canonical domain: `https://www.charmingreene.com`.
- Apex domain redirects to `www`.
- Booking inquiries route into the Charmin Greene WGOS workflow.
- Private proposal, agreement, client-workspace and payment routes are handled through brand-native Vercel endpoints and are excluded from indexing.
- Public SEO landing pages cover featured saxophonist, horn arranging, private events, weddings and live performances.
- `/epk` serves the production electronic press kit.
- `/book-now` redirects to the current booking inquiry experience.

## DNS migration
The domain transfer to Vercel has been initiated. Before Vercel nameservers become authoritative, preserve all Google Workspace mail DNS records (MX, SPF, DKIM, DMARC and any verification records) in the Vercel DNS zone so mail continuity is not interrupted.
