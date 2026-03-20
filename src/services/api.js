import axios from 'axios';

const PIXABAY_KEY = process.env.REACT_APP_PIXABAY_KEY || '22495977-b39eb11e1b18c5f2c16a6c595';
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY || '';
const PEXELS_KEY = process.env.REACT_APP_PEXELS_KEY || '';

// Normalize responses from different APIs into a unified format
const normalizePixabay = (hit) => ({
  id: `pixabay-${hit.id}`,
  src: hit.webformatURL,
  srcLarge: hit.largeImageURL,
  srcOriginal: hit.largeImageURL,
  alt: hit.tags,
  photographer: hit.user,
  photographerUrl: `https://pixabay.com/users/${hit.user}-${hit.user_id}/`,
  width: hit.imageWidth,
  height: hit.imageHeight,
  likes: hit.likes,
  downloads: hit.downloads,
  views: hit.views,
  source: 'Free',
  sourceUrl: hit.pageURL,
  color: '#2ecc71',
  tags: hit.tags ? hit.tags.split(', ') : [],
});

const normalizeUnsplash = (photo) => ({
  id: `unsplash-${photo.id}`,
  src: photo.urls.regular,
  srcLarge: photo.urls.full,
  srcOriginal: photo.urls.raw,
  alt: photo.alt_description || photo.description || 'Unsplash photo',
  photographer: photo.user.name,
  photographerUrl: photo.user.links.html,
  width: photo.width,
  height: photo.height,
  likes: photo.likes,
  downloads: photo.downloads || 0,
  views: 0,
  source: 'Unsplash',
  sourceUrl: photo.links.html,
  color: '#e74c3c',
  tags: photo.tags ? photo.tags.map(t => t.title) : [],
});

const normalizePexels = (photo) => ({
  id: `pexels-${photo.id}`,
  src: photo.src.large,
  srcLarge: photo.src.large2x,
  srcOriginal: photo.src.original,
  alt: photo.alt || 'Pexels photo',
  photographer: photo.photographer,
  photographerUrl: photo.photographer_url,
  width: photo.width,
  height: photo.height,
  likes: 0,
  downloads: 0,
  views: 0,
  source: 'Pexels',
  sourceUrl: photo.url,
  color: '#3498db',
  tags: [],
});

// API Fetchers
const searchPixabay = async (query, page = 1, perPage = 30, filters = {}) => {
  if (!PIXABAY_KEY) return { images: [], total: 0 };
  try {
    const params = {
      key: PIXABAY_KEY,
      q: query,
      image_type: 'photo',
      per_page: perPage,
      page,
      safesearch: true,
    };

    if (filters.color) params.colors = filters.color;
    if (filters.orientation) params.orientation = filters.orientation;
    if (filters.order) params.order = filters.order;

    const response = await axios.get('https://pixabay.com/api/', { params });
    return {
      images: response.data.hits.map(normalizePixabay),
      total: response.data.totalHits,
    };
  } catch (error) {
    console.error('Pixabay API error:', error.message);
    return { images: [], total: 0 };
  }
};

const searchUnsplash = async (query, page = 1, perPage = 30, filters = {}) => {
  if (!UNSPLASH_KEY) return { images: [], total: 0 };
  try {
    const params = {
      query,
      page,
      per_page: perPage,
    };

    if (filters.orientation) params.orientation = filters.orientation;
    if (filters.color) params.color = filters.color;
    if (filters.order === 'latest') params.order_by = 'latest';

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params,
      headers: {
        Authorization: `Client-ID ${UNSPLASH_KEY}`,
      },
    });
    return {
      images: response.data.results.map(normalizeUnsplash),
      total: response.data.total,
    };
  } catch (error) {
    console.error('Unsplash API error:', error.message);
    return { images: [], total: 0 };
  }
};

const searchPexels = async (query, page = 1, perPage = 30, filters = {}) => {
  if (!PEXELS_KEY) return { images: [], total: 0 };
  try {
    const params = {
      query,
      page,
      per_page: perPage,
    };

    if (filters.orientation) params.orientation = filters.orientation;
    if (filters.color) params.color = filters.color;

    const response = await axios.get('https://api.pexels.com/v1/search', {
      params,
      headers: {
        Authorization: PEXELS_KEY,
      },
    });
    return {
      images: response.data.photos.map(normalizePexels),
      total: response.data.total_results,
    };
  } catch (error) {
    console.error('Pexels API error:', error.message);
    return { images: [], total: 0 };
  }
};

// Main search function - queries all enabled APIs in parallel
export const searchImages = async (query, page = 1, perPage = 12, sources = null, filters = {}) => {
  const apiMap = {
    Free: searchPixabay,
    Unsplash: searchUnsplash,
    Pexels: searchPexels,
  };

  const activeSources = sources || Object.keys(apiMap);

  const results = await Promise.allSettled(
    activeSources.map((source) => apiMap[source]?.(query, page, perPage, filters))
  );

  let allImages = [];
  let totalResults = 0;

  results.forEach((result) => {
    if (result.status === 'fulfilled' && result.value) {
      allImages = [...allImages, ...result.value.images];
      totalResults += result.value.total;
    }
  });

  // Shuffle images from different sources for variety
  allImages = allImages.sort(() => Math.random() - 0.5);

  return { images: allImages, total: totalResults };
};

// Get available API sources (ones with keys configured)
export const getAvailableSources = () => {
  const sources = [];
  if (PIXABAY_KEY) sources.push('Free');
  if (UNSPLASH_KEY) sources.push('Unsplash');
  if (PEXELS_KEY) sources.push('Pexels');
  return sources;
};

// Download image
export const downloadImage = async (url, filename) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
    });
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    return true;
  } catch (error) {
    console.error('Download error:', error.message);
    // Fallback: open in new tab
    window.open(url, '_blank');
    return false;
  }
};

// Favorites management
const FAVORITES_KEY = 'imagefinder_favorites';

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
};

export const toggleFavorite = (image) => {
  const favorites = getFavorites();
  const index = favorites.findIndex((f) => f.id === image.id);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.unshift(image);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
};

export const isFavorite = (imageId) => {
  return getFavorites().some((f) => f.id === imageId);
};

// Search history management
const HISTORY_KEY = 'imagefinder_history';
const MAX_HISTORY = 10;

export const getSearchHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
};

export const addToHistory = (query) => {
  const history = getSearchHistory().filter((h) => h !== query);
  history.unshift(query);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
};
