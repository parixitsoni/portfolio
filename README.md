# 🧊 Parixit Soni - Portfolio Website

A modern, high-performance, and accessible developer portfolio website built with **Next.js (App Router)**, **Tailwind CSS**, and **React 19**.

---

## 🎨 Design & UI Features

- **Unified Glassmorphism Theme**: Premium frosted glass effects, vibrant backdrop blur gradients, and automated smooth transitions.
- **Dynamic Theme Context**: Custom context-based light/dark theme management that automatically checks the user's local time boundary (7:00 PM to 6:59 AM for dark mode default) or respects manual theme overrides seamlessly across all navigation and layout layers.
- **Responsive Mobile Layout**: Mobile-first grid layouts, responsive highlights, and an interactive iOS-inspired floating navigation bar that adjusts to screens down to 320px wide.
- **Micro-Animations**: Smooth entry animations using bezier ease-ins and pulse glows.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.js              # Global layout, Google Fonts config, and ThemeProvider injection
│   ├── globals.css            # Custom CSS style declarations & design tokens
│   ├── page.js                # Main home page component displaying the section list
│   └── learning/              # The "Learning Vault" subpage displaying technical notes
├── components/
│   ├── Navbar/                # Navigation layout components (Desktop & Mobile viewports)
│   ├── Hero/                  # Intro landing section with animated user profile
│   ├── Experience/            # Work experience timeline components & layout
│   ├── Skills/                # Skill cluster grids calling simpleicons logos
│   ├── UI/                    # Clean custom reusable components (Buttons, Inputs, Badges, etc.)
│   ├── About.jsx              # About me details & statistical pillars
│   ├── Projects.jsx           # Featured project showcase tabs with browser layouts
│   ├── Education.jsx          # Academic history card listings
│   ├── Contact.jsx            # Form utilizing Web3Forms API with automatic mailto fallback
│   └── Footer.jsx             # Social links and footer info
├── constants/
│   └── personal-data.js       # Centralized profile credentials & social handles (obfuscated)
├── context/
│   └── ThemeContext.js        # Global context provider managing dark/light theme state
├── hooks/
│   ├── useTheme.js            # Unified consumer hook for the ThemeContext
│   └── useActiveSection.js    # Scroll spy observer mapping active scroll areas
└── utils/
    ├── formatting.js          # Consistently formats dates & durations
    ├── paths.js               # Resolves relative assets for local or custom static deploys
    └── learning-parser.js     # Parses local markdown files on build
```

---

## 🚀 Getting Started

### Installation
Ensure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
# Install package dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
To export the portfolio as a collection of static files (HTML, CSS, JS) optimized for hosting on GitHub Pages, Netlify, or Vercel:
```bash
# Compiles the application and generates static files under the /out folder
npm run build
```

---

## 🔒 Security & Performance Features

- **Credentials Obfuscation**: Developer contact details (email and phone) are obfuscated via runtime Base64 getters in JS to prevent web scrapers and email harvester bots from scraping the source code directly.
- **Web3Forms Contact API**: The contact form submits entries directly via the Web3Forms API in the background. If the user does not have a public key environment variable configured (`NEXT_PUBLIC_WEB3FORMS_KEY`), it automatically falls back to preparing a client-side mail client template dynamically.
- **Font Optimization**: Google fonts (`Inter` and `Outfit`) are imported using Next.js font loaders (`next/font/google`), caching the fonts locally on compilation and removing render-blocking external network requests.
- **Static Export Mock Bypass**: Production static deployments automatically bypass mock API endpoints, saving local content additions directly to the client's `localStorage` and keeping the browser console error-free.
