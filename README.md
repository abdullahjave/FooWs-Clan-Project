# FooW Clan Website

A premium gaming clan website for FooW Clan - a legendary Age of Kings: The Conquerors community since 1999.

## Features

- **Modern Tech Stack**: React 19, Vite, Tailwind CSS, Framer Motion
- **Fully Responsive**: Mobile-first design with smooth animations
- **Dark Gaming Theme**: Medieval fantasy aesthetic with glassmorphism
- **Fast Performance**: Optimized for quick loading
- **No Backend Required**: Static site with JSON data

## Pages

- **Home**: Hero section with clan statistics
- **About**: Clan history and timeline
- **Leadership**: Featured leader profiles
- **Members**: Searchable member directory with filters
- **Clan Wars**: Historic battle records
- **Custom Maps**: Map showcase gallery
- **Join Clan**: Application form

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

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

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Vite and deploy

### Option 3: Manual Deploy

1. Run `npm run build`
2. Upload the `dist` folder to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Project Structure

```
foow-clan/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Leadership.jsx
│   │   ├── Members.jsx
│   │   ├── ClanWars.jsx
│   │   ├── CustomMaps.jsx
│   │   └── JoinClan.jsx
│   ├── data/
│   │   ├── members.json
│   │   └── maps.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── package.json
```

## Technologies

- **React 19**: Latest React features
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **React Router DOM**: Client-side routing
- **Framer Motion**: Smooth animations
- **Lucide React**: Modern icon library

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  primary: { /* Dark blue shades */ },
  accent: { /* Blue, silver, gold */ }
}
```

### Data

Update JSON files in `src/data/`:
- `members.json`: Clan member information
- `maps.json`: Custom map details

## License

Created for FooW Clan © 1999-2026

## Support

For issues or questions, contact the FooW Clan leadership team.
