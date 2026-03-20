<div align="center" style="background-color: #0d1117; padding: 40px;">

<br/>

<img src="public/favicon.svg" alt="FotoRoom.Az Logo" width="100" />

<br/><br/>

# FotoRoom.Az

**Milyonlarla pulsuz, yuksek keyfiyyetli sekilleri bir yerde axtar ve yukle.**
*Discover stunning, high-quality images from multiple sources — all in one place.*

<br/>

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-FotoRoom.Az-6c5ce7?style=for-the-badge&logo=googlechrome&logoColor=white)](https://goshgarhasanov.github.io/search-image-react-app)
[![React](https://img.shields.io/badge/React-18.2-000000?style=for-the-badge&logo=react&logoColor=61dafb)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-000000?style=for-the-badge)](LICENSE)
[![PRs](https://img.shields.io/badge/PRs-Welcome-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/goshgarhasanov/search-image-react-app/pulls)

<br/>

[Features](#-features) &nbsp;&bull;&nbsp; [Demo](#-demo) &nbsp;&bull;&nbsp; [Getting Started](#-getting-started) &nbsp;&bull;&nbsp; [Tech Stack](#-tech-stack) &nbsp;&bull;&nbsp; [Structure](#-project-structure) &nbsp;&bull;&nbsp; [Contributing](#-contributing)

<br/>

</div>

---

<br/>

## Demo

> **[https://goshgarhasanov.github.io/search-image-react-app](https://goshgarhasanov.github.io/search-image-react-app)**

<br/>

## Features

<table>
<tr>
<td width="50%">

### Core
- **Multi-Source Search** — Pixabay, Unsplash, Pexels
- **Masonry Grid** — Pinterest-style responsive layout
- **Image Modal** — Full-size preview with stats
- **Multi-Size Download** — Medium, Large, Original

### Search & Discovery
- **Trending Tags** — Quick popular categories
- **Search History** — Recent searches saved locally
- **Color Filter** — Filter by dominant color
- **Orientation Filter** — Landscape / Portrait / Square
- **Sort Options** — Popular or Latest
- **Keyboard Shortcut** — Press `/` to focus search

</td>
<td width="50%">

### Personalization
- **Favorites System** — Heart toggle + localStorage
- **Favorites Gallery** — Browse saved favorites
- **Dark / Light Theme** — System preference + toggle
- **Grid Size Control** — Compact / Comfortable / Spacious
- **Bilingual UI** — English & Azerbaijani

### User Experience
- **Infinite Scroll** — Auto-load on scroll
- **Copy Image Link** — One-click clipboard copy
- **Share Options** — Native Web Share API
- **Responsive Design** — Mobile-first approach
- **Skeleton Loading** — Shimmer placeholders
- **Smooth Animations** — Polished transitions
- **Toast Notifications** — Non-intrusive feedback

</td>
</tr>
</table>

<br/>

## Tech Stack

| Technology | Purpose |
|:---|:---|
| **React 18** | UI framework with hooks & functional components |
| **Axios** | HTTP client for API requests |
| **react-masonry-css** | Responsive masonry grid layout |
| **react-icons** | Feather icon system |
| **CSS Custom Properties** | Theming & dark mode |
| **localStorage** | Preferences, history & favorites |
| **GitHub Pages** | Deployment & hosting |

<br/>

## Getting Started

### Prerequisites

- **Node.js** >= 16.x &nbsp;|&nbsp; **npm** >= 8.x
- API key from at least one source:
  - [Pixabay](https://pixabay.com/api/docs/) *(free, included by default)*
  - [Unsplash](https://unsplash.com/developers) *(optional)*
  - [Pexels](https://www.pexels.com/api/) *(optional)*

### Installation

```bash
git clone https://github.com/goshgarhasanov/search-image-react-app.git
cd search-image-react-app
npm install
npm start
```

### Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_PIXABAY_KEY=your_pixabay_api_key
REACT_APP_UNSPLASH_KEY=your_unsplash_access_key    # optional
REACT_APP_PEXELS_KEY=your_pexels_api_key            # optional
```

> A default Pixabay key is included for quick testing.

### Deploy

```bash
npm run deploy
```

<br/>

## Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Nav bar, theme & language toggles
│   ├── SearchBar.jsx         # Search input, history & trending
│   ├── FilterBar.jsx         # Color, orientation & sort filters
│   ├── SourceFilter.jsx      # API source toggle chips
│   ├── ImageGrid.jsx         # Masonry grid container
│   ├── ImageCard.jsx         # Image card with hover actions
│   ├── ImageModal.jsx        # Full-size viewer with details
│   ├── FavoritesView.jsx     # Saved favorites gallery
│   ├── EmptyState.jsx        # Placeholder states
│   ├── Loader.jsx            # Loading animation
│   └── Footer.jsx            # Site footer
├── i18n/
│   ├── LanguageContext.js    # Language provider & hook
│   └── translations.js      # EN/AZ translations
├── services/
│   └── api.js                # Pixabay, Unsplash, Pexels integration
├── App.jsx                   # Main app component
├── styles.css                # Global styles + CSS variables
└── index.js                  # Entry point
```

<br/>

## API Sources

| Source | Free Tier | Rate Limit | Filters |
|:---|:---|:---|:---|
| **Pixabay** | Unlimited | 100 req/min | Color, orientation, categories |
| **Unsplash** | 50 req/hour | 50 req/hour | High-res, collections |
| **Pexels** | 200 req/hour | 200 req/hour | Curated, orientation |

<br/>

## Keyboard Shortcuts

| Key | Action |
|:---|:---|
| `/` | Focus search bar |
| `Escape` | Close modal |
| `←` `→` | Navigate images in modal |
| `F` | Toggle favorite (modal open) |

<br/>

## Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/new-feature`
3. **Commit** your changes: `git commit -m 'Add new feature'`
4. **Push** to the branch: `git push origin feature/new-feature`
5. **Open** a Pull Request

<br/>

## License

MIT License — see [LICENSE](LICENSE) for details.

<br/>

## Author

**Goshgar Hasanzadeh** &nbsp;—&nbsp; [@goshgarhasanov](https://github.com/goshgarhasanov)

---

<div align="center">
<br/>
<sub>FotoRoom.Az — Built with React &bull; Powered by Pixabay, Unsplash & Pexels</sub>
<br/><br/>
</div>
