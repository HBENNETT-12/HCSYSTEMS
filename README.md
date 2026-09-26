# Hunter Bennett — Portfolio

Open `index.html` in any modern browser. No build, installation, framework, remote fonts, or network dependency is needed. Upload this entire directory to any static host, preserving its folders.

## Files

- `index.html` — full portfolio and professional content
- `css/style.css` — design tokens, responsive layouts, reduced motion and print styles
- `js/main.js` — navigation, scroll state, reveals, validation and local message preparation
- `resume.html` — accessible résumé view, printable using the browser
- `assets/images/workstation.jpg` — original AI-generated workstation illustration
- `assets/icons/favicon.svg` — HB favicon

## Content and contact

Professional content comes from the supplied master prompt. The projects are the prompt's example projects, not independently verified case studies. Project artwork is intentionally abstract placeholder artwork; replace the `.project-image` containers with your own photos when available. No detailed project pages or invented outcomes have been added.

Email, LinkedIn and GitHub URLs were not supplied. These are explicitly marked Coming soon instead of using invented destinations. The contact form validates all fields and lets visitors download a local message. Nothing is sent or stored on a server. To enable delivery, add your real contact details and connect the form to your chosen endpoint, replacing the local download handler with a request and displaying success only after a successful response.

## Personalization

Edit text directly in the HTML. Change colors and typography in the CSS variables at the top of `css/style.css`. Replace hero artwork at its existing path. Add project links only when destination pages exist. Update Open Graph title and description in the head; add a canonical URL and absolute `og:url`/`og:image` after choosing your final public domain and sharing image.

## Accessibility and responsive behavior

Semantic landmarks, skip navigation, visible focus, labeled fields, error announcements, reduced motion, and progressive enhancement are included. Mobile menu closes on Escape, link selection and outside click. All navigation stays accessible without JavaScript. Layout changes at 1200, 900, 768 and 480 pixels.
