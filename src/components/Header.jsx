import React from 'react';
import { FiSun, FiMoon, FiGlobe, FiHeart } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';

const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6c5ce7"/>
        <stop offset="100%" stopColor="#a855f7"/>
      </linearGradient>
      <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c4b5fd"/>
        <stop offset="100%" stopColor="#818cf8"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="96" fill="url(#logoGrad)"/>
    <rect x="96" y="176" width="320" height="224" rx="32" fill="white" opacity="0.95"/>
    <rect x="196" y="144" width="120" height="48" rx="16" fill="white" opacity="0.95"/>
    <circle cx="256" cy="288" r="80" fill="url(#lensGrad)"/>
    <circle cx="256" cy="288" r="52" fill="white" opacity="0.9"/>
    <circle cx="256" cy="288" r="28" fill="url(#lensGrad)"/>
    <circle cx="242" cy="274" r="10" fill="white" opacity="0.6"/>
    <circle cx="352" cy="208" r="12" fill="#fbbf24"/>
  </svg>
);

const Header = ({ darkMode, onToggleTheme, favoritesCount, onShowFavorites, showingFavorites }) => {
  const { lang, t, toggleLang } = useLang();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => showingFavorites && onShowFavorites()} style={{ cursor: 'pointer' }}>
          <LogoIcon />
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
