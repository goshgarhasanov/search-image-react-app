import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX, FiTrendingUp, FiClock, FiTrash2 } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';
import { getSearchHistory, clearHistory } from '../services/api';

const searchTermMap = {
  'Təbiət': 'Nature', 'Okean': 'Ocean', 'Dağlar': 'Mountains', 'Şəhər': 'City',
  'Yemək': 'Food', 'Heyvanlar': 'Animals', 'Memarlıq': 'Architecture', 'Səyahət': 'Travel',
  'Güllər': 'Flowers', 'Kosmos': 'Space', 'Abstrakt': 'Abstract', 'Texnologiya': 'Technology',
};

const SearchBar = ({ onSearch, isLoading, hasSearched }) => {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (historyRef.current && !historyRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    const h = getSearchHistory();
    setHistory(h);
    if (h.length > 0) setShowHistory(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsFocused(false);
      setShowHistory(false);
      inputRef.current?.blur();
    }
  };

  const handleTrendingClick = (term) => {
    const apiTerm = searchTermMap[term] || term;
    setQuery(term);
    onSearch(apiTerm);
    setIsFocused(false);
    setShowHistory(false);
  };

  const handleHistoryClick = (term) => {
    setQuery(term);
    onSearch(term);
    setShowHistory(false);
  };

  const handleClearHistory = (e) => {
    e.stopPropagation();
    clearHistory();
    setHistory([]);
    setShowHistory(false);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className={`search-section ${hasSearched ? 'compact' : ''}`}>
      {!hasSearched && (
        <div className="search-hero">
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
        </div>
      )}

      <div className="search-wrapper" ref={historyRef}>
        <form onSubmit={handleSubmit} className={`search-form ${isFocused ? 'focused' : ''}`}>
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder={t.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            {query && (
              <button type="button" className="clear-btn" onClick={handleClear}>
                <FiX />
              </button>
            )}
            <button
              type="submit"
              className="search-btn"
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? (
                <div className="btn-spinner" />
              ) : (
                <>
                  <FiSearch />
                  <span>{t.searchBtn}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Search History Dropdown */}
        {showHistory && history.length > 0 && (
          <div className="search-history-dropdown">
            <div className="history-header">
              <span className="history-label">
                <FiClock />
                {t.recentSearches}
              </span>
              <button className="history-clear" onClick={handleClearHistory}>
                <FiTrash2 />
                {t.clearHistory}
              </button>
            </div>
            <div className="history-list">
              {history.map((term, i) => (
                <button
                  key={i}
                  className="history-item"
                  onClick={() => handleHistoryClick(term)}
                >
                  <FiClock className="history-item-icon" />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {!hasSearched && (
        <div className="trending-section">
          <div className="trending-label">
            <FiTrendingUp />
            <span>{t.trendingLabel}</span>
          </div>
          <div className="trending-tags">
            {t.trendingTags.map((term) => (
              <button
                key={term}
                className="trending-tag"
                onClick={() => handleTrendingClick(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
