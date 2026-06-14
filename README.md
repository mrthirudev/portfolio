Portfolio Home (minimal)

Instructions:

1. cd portfolio-home
2. yarn install
3. yarn dev

This is a minimal Vite + React + TypeScript scaffold showing a single Home page matching the attached hero design.

Contact backend

This project includes an optional small Express server to send contact form emails.

Run locally:

```bash
cd portfolio-home
yarn install
# start the contact server (runs on port 4003 by default)
yarn server
# in another terminal start the frontend dev server
yarn dev
```

Environment variables (recommended):

- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP port (465 for SSL, 587 for TLS)
- `SMTP_USER` - SMTP username (also used as default recipient if `CONTACT_TO` unset)
- `SMTP_PASS` - SMTP password
- `CONTACT_TO` - optional email address to receive contact messages (defaults to `SMTP_USER`)

If SMTP variables are not provided the server will use a jsonTransport and return the composed message (useful for development).
If SMTP variables are not provided the server will create a Nodemailer test account (Ethereal). After sending you'll see a preview URL logged in the server terminal and returned in the API response — open that URL to view the message in the browser.

Serverless (Vercel / Netlify)
--------------------------------
You can deploy the frontend and the contact function together on Vercel (recommended). The repository already includes a serverless function at `api/contact.js`.

Quick Vercel steps:
- Push the repo to GitHub.
- Sign in to Vercel and import the GitHub repo.
- Set environment variables in Vercel project settings: either `SENDGRID_API_KEY` (preferred), or `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `CONTACT_TO`.
- Deploy. The contact function will be available at `https://<your-vercel-domain>/api/contact`.

Netlify:
- For Netlify, place `api/contact.js` in the `netlify/functions` folder and adapt build settings, or use Netlify's adapter. Netlify also supports environment variables in site settings.

Notes:
- The function prefers `SENDGRID_API_KEY` if provided, otherwise it will use SMTP creds. If neither is provided the function creates a Nodemailer Ethereal test account (preview URL returned in response) — good for testing.
- When deploying frontend to GitHub Pages you cannot host serverless functions there; use Vercel/Netlify for both frontend + function, or host the function separately and point frontend `VITE_API_URL` to it.