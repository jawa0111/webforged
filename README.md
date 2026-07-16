# InitCode — Agency Portfolio

A premium, single-page portfolio website for a web development agency. Built with **React + Vite** and vanilla CSS (design-token driven). Most effects use the Intersection Observer API, `requestAnimationFrame`, and CSS transitions; the interactive project selector in the Projects section additionally uses **framer-motion**.

## Quick start

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing content

**All editable content lives in [`src/data.js`](src/data.js)** — agency name, contact details, hero copy, services, stats, projects, process steps, testimonials, and the contact form's project types.

### Adding a project

Append one object to the `projects` array in `src/data.js`:

```js
{
  name: 'My New Project',
  description: 'One line about what it is.',
  category: 'webapp',        // 'website' | 'webapp' | 'personal' → drives the filter
  tag: 'Web App',            // label shown on the card
  url: 'https://the-live-site.com',
  image: '/screenshots/my-project.webp', // optional — leave '' for a generated placeholder
  accent: ['#8b5cf6', '#ec4899'],        // placeholder art colors (used when image is '')
}
```

Put screenshot files in `public/` (e.g. `public/screenshots/`) and reference them as `/screenshots/name.webp`.

### Regenerating project preview screenshots

The project cards use real homepage screenshots of each live site, stored in `public/screenshots/`. To recapture them (e.g. after a site redesign), edit the `sites` array in [`shoot.mjs`](shoot.mjs) and run:

```bash
npx playwright install chromium   # first time only
node shoot.mjs
```

It captures a 1440×900 hero screenshot of each URL and also prints each site's title/description/H1 to help you write accurate card copy.

### Changing the accent color

Design tokens are at the top of [`src/index.css`](src/index.css) — edit `--accent-1`, `--accent-2` (and their lighter text variants `--accent-text-1/2`) to re-theme the whole site.

## Structure

```
src/
├── data.js              ← ALL editable content
├── hooks.js             ← reveal / counter / typing / tilt / parallax hooks
├── index.css            ← design tokens + all styles (sectioned table of contents)
├── App.jsx              ← page assembly
└── components/
    ├── Icons.jsx        ← SVG icon set + logo mark
    ├── Preloader.jsx    ← intro loading animation
    ├── Cursor.jsx       ← custom dot + trailing-ring cursor
    ├── ScrollProgress.jsx
    ├── Navbar.jsx       ← sticky nav + mobile drawer
    ├── Hero.jsx / Services.jsx / About.jsx / Projects.jsx
    ├── ProjectMorph.jsx  ← interactive scroll-morph project selector (framer-motion)
    ├── Process.jsx / Testimonials.jsx / Contact.jsx / Footer.jsx
```

## Wiring up the contact form

The form currently simulates a successful send (see `onSubmit` in [`src/components/Contact.jsx`](src/components/Contact.jsx)). Replace the `setTimeout` with a `fetch` to your backend or a form service (Formspree, Basin, etc.).

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (animations collapse, counters/typing render final state).
- Custom cursor renders only on fine-pointer (mouse) devices.
- Keyboard navigable: skip link, focus rings, Escape closes the mobile drawer.
- No runtime dependencies beyond React; fonts load with `display=swap`.
