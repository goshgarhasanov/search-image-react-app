import React, { useState, useEffect, useCallback } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SourceFilter from './components/SourceFilter';
import ImageGrid from './components/ImageGrid';
import ImageModal from './components/ImageModal';
import Loader from './components/Loader';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import { searchImages, getAvailableSources, downloadImage } from './services/api';

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

  const showToast = (message) => {
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

    try {
      const result = await searchImages(searchQuery, 1, 15, activeSources);
      setImages(result.images);
      setTotalResults(result.total);
      if (result.images.length === 0) {
        showToast(t.noImagesFound);
      }
    } catch (err) {
      setError(true);
      showToast(t.errorFetching);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);

    try {
      const result = await searchImages(query, nextPage, 15, activeSources);
      setImages((prev) => [...prev, ...result.images]);
      setPage(nextPage);
    } catch (err) {
      showToast(t.errorLoadMore);
    } finally {
      setLoadingMore(false);
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

  const handleDownload = async (image, customFilename) => {
    const url = image.srcOriginal || image.srcLarge || image.src;
    const filename = customFilename || `${image.source.toLowerCase()}-${image.id.split('-')[1]}.jpg`;
    const success = await downloadImage(url, filename);
    if (success) {
      showToast(t.downloadSuccess);
    } else {
      showToast(t.downloadFallback);
    }
  };

  const handleOpenModal = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleNavigateModal = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasMore = images.length < totalResults;

  return (
    <div className="app">
      <Header
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((d) => !d)}
      />

      <SearchBar onSearch={handleSearch} isLoading={loading} />

      {hasSearched && (
        <SourceFilter
          availableSources={availableSources}
          activeSources={activeSources}
          onToggleSource={handleToggleSource}
          totalResults={totalResults}
        />
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
          />
          {hasMore && (
            <div className="load-more-section">
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <div className="btn-spinner" /> {t.loading}
                  </>
                ) : (
                  t.loadMore
                )}
              </button>
            </div>
          )}
        </>
      )}

      <Footer availableSources={availableSources} />

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          images={images}
          onClose={handleCloseModal}
          onDownload={handleDownload}
          onNavigate={handleNavigateModal}
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
