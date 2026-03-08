# Samuel Barbosa — Portfolio

A high-end personal developer portfolio built with React + Vite. Features a dark aesthetic inspired by the anime Blue Lock, with interactive animations, an interactive 3D globe, and a skill ranking system.

---

## Tech Stack

- **React 18** — UI framework
- **Vite** — build tool and dev server
- **CSS Modules** — scoped component styling
- **Lenis** — smooth scroll
- **Canvas API** — interactive globe + particles

---

## Features

### Animations & Interactions
- **Typing loop** — "Software Engineer" types and deletes in a continuous loop
- **Glitch effect** — h1 glitches on page load
- **Scroll reveal** — sections fade in as they enter the viewport
- **Parallax** — hero background and grid shift on mouse movement
- **Magnetic buttons** — CTA and contact buttons attract to the cursor
- **Draw underline** — project name animates an underline on hover
- **Particle field** — 80 floating blue particles in the hero background
- **Smooth scroll** — powered by Lenis

### Globe (Projects section)
- Pure Canvas API — no external libraries
- Auto-spin with drag-to-rotate
- Smooth lerp interpolation
- Pulse ring animation on project switch
- Continent outlines rendered from lat/lon coordinates

### About section
- Interactive skill grid — click a skill to update the chart
- Animated pie chart showing proficiency percentage
- Solo Leveling-inspired rank system (E → D → C → B → A → S → SS → SSS)
- `#11` Nagi watermark in the background

### Nav
- Fixed navbar with active section indicator
- Underline animates to the current section on scroll
- Smooth scroll to section on click with fade transition

---

## Project Structure

```
src/
  components/
    Cursor.jsx / .module.css       # Custom cursor dot + ring
    Navbar.jsx / .module.css       # Fixed nav with active indicator
    Hero.jsx / .module.css         # Hero section with typing + particles
    About.jsx / .module.css        # Skills pie chart + rank system
    Globe.jsx / .module.css        # Interactive 3D globe (Canvas)
    Projects.jsx / .module.css     # Projects with globe integration
    Contact.jsx / .module.css      # Contact section
    Footer.jsx / .module.css       # Footer
  hooks/
    animations.js                  # useReveal, useFadeIn, useGlobeAnimation, useCursorAnimation
    useDrawUnderline.js            # Animated underline on hover
    useGlitch.js                   # Glitch text effect
    useMagnet.js                   # Magnetic button effect
    useParallax.js                 # Mouse parallax for hero
    useParticles.js                # Canvas particle field
    useReveal.js                   # IntersectionObserver scroll reveal
  data/
    projects.js                    # Project data
  assets/
    nagi.png                       # Blue Lock artwork
  App.jsx
  main.jsx
  index.css                        # Global styles + CSS variables
```

---

## CSS Variables

```css
:root {
  --dark:       #04080f;
  --dark-mid:   #070d1a;
  --dark-light: #0a1228;
  --blue:       #3d6bff;
  --blue-light: #6b8fff;
  --blue-dim:   #1a3fff;
  --white:      #e8e8f0;
  --white-dim:  #8a8aaa;
}
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Deploy

Deployed via [Vercel](https://vercel.com).

```bash
npx vercel
```

---

## Customization

### Adding a project
Edit `src/data/projects.js`:

```js
{
  id: 3,
  counter: '03 / 03',
  name: 'Project Name',
  desc: 'Project description.',
  stack: ['Tech1', 'Tech2'],
  link: 'https://github.com/...',
  type: 'Web App',
  stackShort: 'Tech1',
  status: 'Live',
  rotY: 1.2,   // globe rotation on select
  rotX: 0.1,
}
```

### Updating skills
Edit the `skills` array in `src/components/About.jsx`:

```js
const skills = [
  { name: 'JavaScript', level: 75 },
  { name: 'Python',     level: 60 },
  // ...
]
```

Rank thresholds: `E (<30)` `D (30)` `C (40)` `B (50)` `A (60)` `S (70)` `SS (80)` `SSS (90+)`

---

## Author

**Samuel Barbosa** — [souzasam2008@gmail.com](mailto:souzasam2008@gmail.com)