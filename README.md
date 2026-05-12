# 🧊 Parixit Soni - Portfolio Website

A modern, high-performance portfolio website built with **React**, **Tailwind CSS**, and a **Glassmorphism + Ice Blue** aesthetic.

## 🎨 Design Features

- **Glassmorphism Theme**: Semi-transparent backgrounds with backdrop blur effects
- **Ice Blue Palette**: Frosty blues (#0891B2), cyans, and soft shadows
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Elegant transitions and hover effects

## 📁 Project Structure

```
src/
├── config.js              # Centralized theme & personal data
├── utils/
│   └── formatting.js      # Date formatting & utility functions
├── components/
│   ├── Navbar.jsx         # Navigation bar (sticky)
│   ├── Hero.jsx           # Landing section
│   ├── About.jsx          # About me section
│   ├── Experience.jsx     # Work history
│   ├── Skills.jsx         # Technical skills
│   ├── Education.jsx      # Education background
│   ├── Contact.jsx        # Contact information
│   ├── Footer.jsx         # Footer
│   └── Card.jsx           # Reusable glass card components
├── App.jsx                # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles

Configuration Files:
├── vite.config.js         # Vite build config
├── tailwind.config.js     # Tailwind CSS theme
├── postcss.config.js      # PostCSS plugins
├── package.json           # Dependencies
└── index.html             # HTML entry point
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Key Features

### Centralized Configuration
All theme colors, personal data, and site-wide settings are in `src/config.js`:

```js
export const theme = {
  colors: { primary, secondary, accent, ... },
  effects: { blur, opacity, border }
};

export const personalData = {
  name, title, email, phone, location, ...
};
```

### Component-Based Architecture
Each component is **under 100 lines**:
- `Navbar.jsx` - Navigation with mobile menu
- `Hero.jsx` - Hero landing section
- `About.jsx` - About & expertise overview
- `Experience.jsx` - Work experience timeline
- `Skills.jsx` - Technical skills grid
- `Education.jsx` - Education background
- `Contact.jsx` - Contact methods
- `Card.jsx` - Reusable glassmorphic card component

### Utility Functions
Common functions in `src/utils/formatting.js`:
- `formatDate()` - Format dates consistently
- `getDateRange()` - Format date ranges
- `calculateDuration()` - Calculate work duration
- `truncateText()` - Truncate long text

### Data Mapping
All content is directly mapped from `resume.md` into the UI components:
- Professional summary → Hero section
- Work experience → Experience component
- Skills → Skills grid
- Education → Education timeline

## 🎨 Customization

### Change Theme Colors
Edit `src/config.js`:
```js
export const theme = {
  colors: {
    primary: "#0891B2",      // Change primary cyan
    secondary: "#06B6D4",    // Change secondary
    // ... other colors
  }
};
```

### Update Personal Data
Edit `src/config.js`:
```js
export const personalData = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  // ... other data
};
```

### Modify Content
- **Experience**: Edit the `experiences` array in `src/components/Experience.jsx`
- **Skills**: Edit the `skillsData` array in `src/components/Skills.jsx`
- **Education**: Edit the `educationData` array in `src/components/Education.jsx`

## 📦 Tech Stack

- **React 18** - UI library
- **Tailwind CSS 3** - Utility-first CSS
- **Lucide React** - Icon library
- **Vite** - Build tool & dev server
- **PostCSS** - CSS transformations

## 🔧 Building & Deployment

### Development
```bash
npm run dev  # Runs on http://localhost:5173
```

### Production Build
```bash
npm run build      # Creates optimized build
npm run preview    # Preview the build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive using Tailwind's breakpoint system.

## ✨ Performance Features

- ✅ Lazy loading with React Suspense-ready
- ✅ Optimized CSS with Tailwind purging
- ✅ Smooth scroll behavior
- ✅ Accessible color contrast
- ✅ Mobile-first responsive design
- ✅ Minified production build

## 🤝 Contributing

Feel free to fork and customize this portfolio for your own use!

---

**Built with ❄️ and React** - © 2026 Parixit Soni
