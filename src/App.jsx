import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import SourceFilter from './components/SourceFilter';
import ImageGrid from './components/ImageGrid';
import ImageModal from './components/ImageModal';
import FavoritesView from './components/FavoritesView';
import Loader from './components/Loader';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import {
  searchImages, getAvailableSources, downloadImage,
  addToHistory, getFavorites, toggleFavorite, copyToClipboard
} from './services/api';

const AppContent = () => {
  const { t } = useLang();

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [availableSources] = useState(getAvailableSources);
  const [activeSources, setActiveSources] = useState(getAvailableSources);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false });
  const [favorites, setFavorites] = useState(getFavorites);
  const [showFavorites, setShowFavorites] = useState(false);
  const [gridSize, setGridSize] = useState(() => localStorage.getItem('gridSize') || 'comfortable');
  const [filters, setFilters] = useState({ color: '', orientation: '', order: 'popular' });

  const sentinelRef = useRef(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Infinite scroll
  const hasMore = images.length < totalResults;

  const handleLoadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return;
    isLoadingRef.current = true;
    const nextPage = page + 1;
    setLoadingMore(true);

    try {
      const result = await searchImages(query, nextPage, 15, activeSources, filters);
      setImages((prev) => [...prev, ...result.images]);
      setPage(nextPage);
    } catch {
      showToastMsg(t.errorLoadMore);
    } finally {
      setLoadingMore(false);
      isLoadingRef.current = false;
    }
  }, [page, query, activeSources, filters, hasMore, t.errorLoadMore]);

  useEffect(() => {
    if (!hasSearched || !hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingRef.current) {
          handleLoadMore();
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasSearched, hasMore, handleLoadMore]);

  const showToastMsg = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    setPage(1);
    setLoading(true);
    setError(false);
    setHasSearched(true);
    setImages([]);
    setShowFavorites(false);
    addToHistory(searchQuery);

    try {
      const result = await searchImages(searchQuery, 1, 15, activeSources, filters);
      setImages(result.images);
      setTotalResults(result.total);
      if (result.images.length === 0) {
        showToastMsg(t.noImagesFound);
      }
    } catch {
      setError(true);
      showToastMsg(t.errorFetching);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSource = (source) => {
    setActiveSources((prev) => {
      if (prev.length === 1 && prev.includes(source)) return prev;
      return prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source];
    });
  };

  useEffect(() => {
    if (hasSearched && query) {
      handleSearch(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSources]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (hasSearched && query) {
      // Re-search with new filters
      setPage(1);
      setLoading(true);
      setImages([]);
      searchImages(query, 1, 15, activeSources, newFilters)
        .then((result) => {
          setImages(result.images);
          setTotalResults(result.total);
        })
        .catch(() => showToastMsg(t.errorFetching))
        .finally(() => setLoading(false));
    }
  };

  const handleGridSizeChange = (size) => {
    setGridSize(size);
    localStorage.setItem('gridSize', size);
  };

  const handleDownload = async (image, customFilename) => {
    const url = image.srcOriginal || image.srcLarge || image.src;
    const filename = customFilename || `imagefinder-${image.id.split('-')[1]}.jpg`;
    const success = await downloadImage(url, filename);
    if (success) {
      showToastMsg(t.downloadSuccess);
    } else {
      showToastMsg(t.downloadFallback);
    }
  };

  const handleToggleFavorite = useCallback((image) => {
    const updatedFavorites = toggleFavorite(image);
    setFavorites([...updatedFavorites]);
    const isFav = updatedFavorites.some((f) => f.id === image.id);
    showToastMsg(isFav ? t.addedToFavorites : t.removedFromFavorites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.addedToFavorites, t.removedFromFavorites]);

  const handleCopyLink = useCallback(async (image) => {
    const url = image.sourceUrl || image.srcLarge || image.src;
    await copyToClipboard(url);
    showToastMsg(t.copiedToClipboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.copiedToClipboard]);

  const handleOpenModal = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleNavigateModal = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const handleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showFavorites) {
    return (
      <div className="app">
        <Header
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((d) => !d)}
          favoritesCount={favorites.length}
          onShowFavorites={handleShowFavorites}
          showingFavorites={showFavorites}
        />
        <FavoritesView
          favorites={favorites}
          onBack={() => setShowFavorites(false)}
          onOpenModal={handleOpenModal}
          onDownload={handleDownload}
          onToggleFavorite={handleToggleFavorite}
          onCopyLink={handleCopyLink}
          gridSize={gridSize}
        />
        <Footer />
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            images={favorites}
            onClose={handleCloseModal}
            onDownload={handleDownload}
            onNavigate={handleNavigateModal}
            onToggleFavorite={handleToggleFavorite}
            onCopyLink={handleCopyLink}
          />
        )}
        <div className={`toast ${toast.visible ? 'visible' : ''}`}>
          {toast.message}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((d) => !d)}
        favoritesCount={favorites.length}
        onShowFavorites={handleShowFavorites}
        showingFavorites={showFavorites}
      />

      <SearchBar onSearch={handleSearch} isLoading={loading} hasSearched={hasSearched} />

      {hasSearched && (
        <>
          <SourceFilter
            availableSources={availableSources}
            activeSources={activeSources}
            onToggleSource={handleToggleSource}
            totalResults={totalResults}
          />
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            gridSize={gridSize}
            onGridSizeChange={handleGridSizeChange}
          />
        </>
      )}

      {loading && <Loader />}

      {!loading && error && <EmptyState type="error" />}

      {!loading && !error && !hasSearched && <EmptyState type="initial" />}

      {!loading && !error && hasSearched && images.length === 0 && (
        <EmptyState type="noResults" query={query} />
      )}

      {!loading && images.length > 0 && (
        <>
          <ImageGrid
            images={images}
            onOpenModal={handleOpenModal}
            onDownload={handleDownload}
            onToggleFavorite={handleToggleFavorite}
            onCopyLink={handleCopyLink}
            gridSize={gridSize}
          />
          {hasMore && (
            <div ref={sentinelRef} className="load-more-section">
              {loadingMore && (
                <div className="load-more-spinner">
                  <div className="btn-spinner" />
                  <span>{t.loading}</span>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <Footer />

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          images={images}
          onClose={handleCloseModal}
          onDownload={handleDownload}
          onNavigate={handleNavigateModal}
          onToggleFavorite={handleToggleFavorite}
          onCopyLink={handleCopyLink}
        />
      )}

      <button
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        <FiArrowUp />
      </button>

      <div className={`toast ${toast.visible ? 'visible' : ''}`}>
        {toast.message}
      </div>
    </div>
  );
};

const App = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
