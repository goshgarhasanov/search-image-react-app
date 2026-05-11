import React from 'react';
import { FiGithub, FiCoffee } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          FotoRoom.Az — Developed by{' '}
          <a
            href="https://github.com/goshgarhasanov"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-author"
          >
            <FiGithub /> Goshgar Hasanzadeh
          </a>
        </p>
        <a
          href="https://kofe.al/@goshgarhasanov"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-coffee"
        >
          <FiCoffee /> {t.supportMe}
        </a>
        <p className="footer-disclaimer">{t.disclaimer}</p>
      </div>
    </footer>
  );
};

export default Footer;
