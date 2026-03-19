import React from 'react';
import { FiSun, FiMoon, FiCamera, FiGlobe } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';

const Header = ({ darkMode, onToggleTheme }) => {
  const { lang, t, toggleLang } = useLang();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <FiCamera className="logo-icon" />
          <span className="logo-text">{t.logoText}</span>
          <span className="logo-badge">{t.logoBadge}</span>
        </div>
        <nav className="header-nav">
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
