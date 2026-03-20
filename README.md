<p align="center">
  <img src="https://img.icons8.com/fluency/96/camera.png" alt="ImageFinder Pro Logo" width="80" />
</p>

<h1 align="center">ImageFinder Pro</h1>

<p align="center">
  <strong>Discover stunning, high-quality images from multiple sources — all in one place.</strong>
</p>

<p align="center">
  <a href="https://goshgarhasanov.github.io/search-image-react-app">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Now-6c5ce7?style=for-the-badge&logo=github" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/React-18.2-61dafb?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge" alt="PRs Welcome" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## Demo

**[Live Demo](https://goshgarhasanov.github.io/search-image-react-app)**

| Light Mode | Dark Mode |
|:---:|:---:|
| ![Light Mode](https://via.placeholder.com/400x250/f8f9fa/6c5ce7?text=Light+Mode) | ![Dark Mode](https://via.placeholder.com/400x250/0f0f1a/a855f7?text=Dark+Mode) |

## Features

### Core
- **Multi-Source Search** — Search across Pixabay, Unsplash, and Pexels simultaneously
- **Masonry Grid Layout** — Beautiful Pinterest-style responsive image grid
- **Image Modal** — Full-size preview with image details, stats, and download options
- **Multiple Download Sizes** — Medium, Large, and Original quality downloads

### Search & Discovery
- **Trending Tags** — Quick access to popular search categories
- **Search History** — Recently searched terms saved locally for quick access
- **Color Filter** — Filter images by dominant color
- **Orientation Filter** — Filter by landscape, portrait, or square
- **Sort Options** — Sort results by popularity, latest, or relevance
- **Keyboard Shortcut** — Press `/` to instantly focus the search bar

### Personalization
- **Favorites System** — Save your favorite images locally with heart toggle
- **Favorites Gallery** — Browse all your saved favorites in one place
- **Dark / Light Theme** — Toggle with system preference detection and persistence
- **Grid Size Control** — Switch between compact, comfortable, and spacious layouts
- **Bilingual UI** — Full English and Azerbaijani language support

### User Experience
- **Infinite Scroll** — Automatically loads more images as you scroll down
- **Copy Image Link** — One-click copy image URL to clipboard
- **Share Options** — Quick sharing via native share API or clipboard
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **Skeleton Loading** — Elegant shimmer placeholders while images load
- **Smooth Animations** — Polished transitions and micro-interactions
- **Scroll to Top** — Quick navigation button on long pages
- **Toast Notifications** — Non-intrusive feedback for user actions

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework with hooks & functional components |
| **Axios** | HTTP client for API requests |
| **react-masonry-css** | Responsive masonry grid layout |
| **react-icons (Feather)** | Consistent icon system |
| **CSS Custom Properties** | Theming & dark mode support |
| **localStorage** | Persistent preferences, history & favorites |
| **GitHub Pages** | Deployment & hosting |

## Getting Started

### Prerequisites

- **Node.js** >= 16.x
- **npm** >= 8.x
- API key from at least one source:
  - [Pixabay](https://pixabay.com/api/docs/) (free, included by default)
  - [Unsplash](https://unsplash.com/developers) (optional)
  - [Pexels](https://www.pexels.com/api/) (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/goshgarhasanov/search-image-react-app.git

# Navigate to project directory
cd search-image-react-app

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required (at least one)
REACT_APP_PIXABAY_KEY=your_pixabay_api_key

# Optional — enables additional sources
REACT_APP_UNSPLASH_KEY=your_unsplash_access_key
REACT_APP_PEXELS_KEY=your_pexels_api_key
```

> **Note:** A default Pixabay key is included for quick testing. Replace it with your own key for production use.

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation bar with theme & language toggles
│   ├── SearchBar.jsx        # Search input with history & trending tags
│   ├── FilterBar.jsx        # Color, orientation & sort filters
│   ├── SourceFilter.jsx     # API source toggle chips
│   ├── ImageGrid.jsx        # Masonry grid container
│   ├── ImageCard.jsx        # Individual image card with hover actions
│   ├── ImageModal.jsx       # Full-size image viewer with details
│   ├── FavoritesView.jsx    # Saved favorites gallery
│   ├── EmptyState.jsx       # Placeholder states (initial, no results, error)
│   ├── Loader.jsx           # Loading animation
│   └── Footer.jsx           # Site footer
├── i18n/
│   ├── LanguageContext.js   # Language provider & hook
│   └── translations.js     # EN/AZ translation strings
├── services/
│   └── api.js               # API integration (Pixabay, Unsplash, Pexels)
├── App.jsx                  # Main application component
├── styles.css               # Global styles with CSS variables
└── index.js                 # Entry point
```

## API Sources

| Source | Free Tier | Rate Limit | Features |
|---|---|---|---|
| **Pixabay** | Unlimited | 100 req/min | Color filter, orientation, categories |
| **Unsplash** | 50 req/hour | 50 req/hour | High-res photos, collections |
| **Pexels** | 200 req/hour | 200 req/hour | Curated photos, videos |

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` | Focus search bar |
| `Escape` | Close modal / Clear search |
| `←` `→` | Navigate images in modal |
| `F` | Toggle favorite (when modal is open) |

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Author

**Goshgar Hasanzadeh**

- GitHub: [@goshgarhasanov](https://github.com/goshgarhasanov)

---

<p align="center">
  <sub>Built with React and powered by Pixabay, Unsplash & Pexels APIs</sub>
</p>
