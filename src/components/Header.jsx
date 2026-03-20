import React from 'react';
import { FiSun, FiMoon, FiCamera, FiGlobe, FiHeart } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';

const Header = ({ darkMode, onToggleTheme, favoritesCount, onShowFavorites, showingFavorites }) => {
  const { lang, t, toggleLang } = useLang();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => showingFavorites && onShowFavorites()} style={{ cursor: 'pointer' }}>
          <FiCamera className="logo-icon" />
          <span className="logo-text">{t.logoText}</span>
          <span className="logo-badge">{t.logoBadge}</span>
        </div>
        <nav className="header-nav">
          <button
            className={`favorites-toggle ${showingFavorites ? 'active' : ''}`}
            onClick={onShowFavorites}
            title={t.favorites}
          >
            <FiHeart />
            {favoritesCount > 0 && (
              <span className="favorites-badge">{t.favoritesCount(favoritesCount)}</span>
            )}
          </button>
          <button
            className="lang-toggle"
            onClick={toggleLang}
            title={lang === 'en' ? 'Azərbaycanca' : 'English'}
          >
            <FiGlobe />
            <span>{lang === 'en' ? 'AZ' : 'EN'}</span>
          </button>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            title={darkMode ? t.switchToLight : t.switchToDark}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
