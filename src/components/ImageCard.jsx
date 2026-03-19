import React, { useState } from 'react';
import { FiDownload, FiMaximize2, FiHeart, FiUser, FiExternalLink } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';

const ImageCard = ({ image, onOpenModal, onDownload }) => {
  const { t } = useLang();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const aspectRatio = image.height / image.width;

  return (
    <div
      className={`image-card ${isLoaded ? 'loaded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--aspect-ratio': aspectRatio }}
    >
      <div className="image-card-inner">
        {!isLoaded && (
          <div className="image-skeleton">
            <div className="skeleton-shimmer" />
          </div>
        )}
        <img
          src={image.src}
          alt={image.alt}
          className="card-image"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />

        <div className={`card-overlay ${isHovered ? 'visible' : ''}`}>
          <div className="overlay-top" />

          <div className="overlay-actions">
            <button
              className="action-btn primary"
              onClick={(e) => { e.stopPropagation(); onOpenModal(image); }}
              title={t.viewFullSize}
            >
              <FiMaximize2 />
            </button>
            <button
              className="action-btn"
              onClick={(e) => { e.stopPropagation(); onDownload(image); }}
              title={t.download}
            >
              <FiDownload />
            </button>
            <a
              className="action-btn"
              href={image.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={t.viewOnSource}
            >
              <FiExternalLink />
            </a>
          </div>

          <div className="overlay-bottom">
            <div className="photographer-info">
              <FiUser className="photographer-icon" />
              <span>{image.photographer}</span>
            </div>
            {image.likes > 0 && (
              <div className="likes-count">
                <FiHeart />
                <span>{image.likes.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
