import React from 'react';
import { FiGithub } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          Developed by{' '}
          <a
            href="https://github.com/goshgarhasanov"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-author"
          >
            <FiGithub /> Goshgar Hasanzadeh
          </a>
        </p>
        <p className="footer-disclaimer">{t.disclaimer}</p>
      </div>
    </footer>
  );
};

export default Footer;
