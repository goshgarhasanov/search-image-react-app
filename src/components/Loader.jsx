import React from 'react';
import { useLang } from '../i18n/LanguageContext';

const Loader = () => {
  const { t } = useLang();

  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-dot" />
        <div className="loader-dot" />
        <div className="loader-dot" />
      </div>
      <p className="loader-text">{t.searchAcross}</p>
    </div>
  );
};

export default Loader;
