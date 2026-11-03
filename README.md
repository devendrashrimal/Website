# Dr. Devendra Kumar Shrimal

Static informational cardiology practice website. Astro, TypeScript and locally hosted fonts; Leaflet displays the residence clinic map using OpenStreetMap tiles.

## Development

Use the Node version in `.nvmrc`, then `npm ci`, `npm run dev`.
Run `npm run check` and `npm run build` before deployment.

## Free deployment - Cloudflare Pages

Connect this repository in Cloudflare Pages. Build command: `npm run build`. Output directory: `dist`. Set `NODE_VERSION` to `24.22.2`. No runtime secrets or paid backend are required. Do not upload source archives or WordPress backups.

Canonical production host: https://www.indiacardiologist.in. Add this custom domain inside Pages first, then create the DNS record Cloudflare provides at the authoritative DNS provider. Registration can remain at GoDaddy. For the apex hostname, follow Cloudflare's zone requirements and configure a redirect to www. Preserve existing email/DNS records. Verify HTTPS before switching traffic.

The build generates CSP script hashes and Cloudflare Pages security headers in `dist/_headers`. Verify actual response headers on Pages; other hosts may ignore this file. The policy permits inline styles for Leaflet positioning; inline scripts are allowed only by generated hashes. Check map controls, motion and all pages under the deployed policy.

Production indexing is enabled. Protect or apply noindex headers to non-production preview deployments in the host configuration. Cloudflare account, GitHub and domain account should use MFA.

## Operations

Confirmed clinic details live in `src/data/practice.ts`. There are no appointment forms, patient accounts, payments, database or WordPress runtime. Review clinical information with the practice before publication. Photo assets are responsive AVIF/WebP/JPEG with metadata removed. Original and retired images are maintained outside the published repository.

The source/dependency review found no concrete vulnerability and no known npm advisory at the review date. It was a partial review, not a complete security certification. Production TLS, DNS, headers and account controls require deployment verification.
