# Nursultan Mustapaev — Portfolio

A futuristic, dark-themed developer portfolio built with React, Vite, Tailwind CSS, Framer Motion and React Three Fiber.

## Stack

- **React 19 + Vite** — app shell and build tooling
- **Tailwind CSS** — design tokens and utility styling (see `tailwind.config.js` for the color/type system)
- **Framer Motion** — page-load choreography, scroll reveals, hover micro-interactions
- **React Three Fiber / drei / Three.js** — the interactive 3D tech constellation in the hero section
- **Lucide React** — icon set

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/
    ui/            # SectionHeading, GlassPanel, Reveal — shared building blocks
    Loader.jsx     # boot-sequence loading screen
    Navbar.jsx
    Hero.jsx        HeroScene.jsx   # hero copy + 3D canvas
    About.jsx
    TechUniverse.jsx
    Skills.jsx
    Projects.jsx
    Journey.jsx
    Principles.jsx
    GithubStats.jsx
    Contact.jsx
    Footer.jsx
  data/
    portfolioData.js   # ALL editable content lives here — name, projects, skills, timeline, links
  index.css        # Tailwind layers + global styles + design tokens (glass, gradients, grid)
```

## Customizing content

Everything text-based (name, bio, project descriptions, skills, timeline, links) lives in
`src/data/portfolioData.js`. Edit that file and the whole site updates — no need to touch components.

To wire up your real CV, drop a PDF at `public/Nursultan_Mustapaev_CV.pdf` (the "Download CV" button in
`Hero.jsx` already points there), or update the `href` to your hosted resume link.

To change the accent color or type scale, edit `tailwind.config.js` (`colors.gold`, `fontFamily`) — every
component pulls from those tokens rather than hardcoded values.

## Deploying

The `dist/` folder from `npm run build` is static and can be deployed as-is to Vercel, Netlify, Firebase
Hosting, or any static host.
