# Elite Pest Control Website

Static landing site for Elite Pest Control LLC.

> **Start here:** `GAMEPLAN.md` is the master plan — it sequences the website launch, lead engine, sales, compliance, and scaling into phases. This README only covers the website files and launch placeholders. `OPERATIONS.md` covers the software stack and lead workflow.

## Launch Notes

- Replace launch placeholders: `https://www.your-domain.com`, then add the real business phone and lead email when confirmed.
- Update "Call Elite" and urgent-help CTAs to `tel:` links once the phone number is ready.
- Configure Netlify Forms notifications for the `service-request` form.
- Add GA4 by placing the Google tag snippet in each page head. Event hooks already emit:
  - `mosquito_cta_click`
  - `urgent_help_click`
  - `zip_check`
  - `lead_form_submit`
  - `lead_form_submit_start`
- Verify any license, insurance, 24/7, same-day, or state-specific claims before adding them.

## Files

- `index.html` - seasonal tri-state landing page.
- `service-area/index.html` - service-area SEO page.
- `pest-library/index.html` - bug identification and look-alike SEO page.
- `industries/index.html` - audience-specific residential and commercial service paths.
- `thanks/index.html` - lead form confirmation page.
- `assets/styles.css` - shared responsive design system.
- `assets/app.js` - analytics event hooks and ZIP checker.
- `OPERATIONS.md` - hosting, software, and lead intake blueprint.
