import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX, FiTrendingUp } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';

const searchTermMap = {
  'Təbiət': 'Nature', 'Okean': 'Ocean', 'Dağlar': 'Mountains', 'Şəhər': 'City',
  'Yemək': 'Food', 'Heyvanlar': 'Animals', 'Memarlıq': 'Architecture', 'Səyahət': 'Travel',
  'Güllər': 'Flowers', 'Kosmos': 'Space', 'Abstrakt': 'Abstract', 'Texnologiya': 'Technology',
};

const SearchBar = ({ onSearch, isLoading }) => {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleTrendingClick = (term) => {
    const apiTerm = searchTermMap[term] || term;
    setQuery(term);
    onSearch(apiTerm);
    setIsFocused(false);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-section">
      <div className="search-hero">
        <h1 className="hero-title">{t.heroTitle}</h1>
        <p className="hero-subtitle">{t.heroSubtitle}</p>
      </div>

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
            onFocus={() => setIsFocused(true)}
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
    </div>
  );
};

export default SearchBar;
