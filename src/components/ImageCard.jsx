import React, { useState } from 'react';
import { FiDownload, FiMaximize2, FiHeart, FiUser, FiExternalLink, FiCopy } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';
import { isFavorite } from '../services/api';

const ImageCard = ({ image, onOpenModal, onDownload, onToggleFavorite, onCopyLink }) => {
  const { t } = useLang();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const favorited = isFavorite(image.id);

  const aspectRatio = image.height / image.width;

  return (
    <div
      className={`image-card ${isLoaded ? 'loaded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--aspect-ratio': aspectRatio }}
    >
      <div className="image-card-inner" onClick={() => onOpenModal(image)}>
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
          <div className="overlay-top">
            <button
              className={`action-btn favorite-btn ${favorited ? 'favorited' : ''}`}
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(image); }}
              title={favorited ? t.removeFromFavorites : t.addToFavorites}
            >
              <FiHeart />
            </button>
          </div>

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
            <button
              className="action-btn"
              onClick={(e) => { e.stopPropagation(); onCopyLink(image); }}
              title={t.copyLink}
            >
              <FiCopy />
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
