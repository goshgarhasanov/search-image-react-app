import React, { useEffect, useState, useCallback } from 'react';
import {
  FiX, FiDownload, FiExternalLink, FiUser, FiHeart,
  FiEye, FiMaximize, FiChevronLeft, FiChevronRight,
  FiCopy, FiShare2
} from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';
import { isFavorite } from '../services/api';

const ImageModal = ({ image, images, onClose, onDownload, onNavigate, onToggleFavorite, onCopyLink }) => {
  const { t } = useLang();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const favorited = isFavorite(image.id);

  const currentIndex = images.findIndex(img => img.id === image.id);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsImageLoaded(false);
      setZoomed(false);
      onNavigate(images[currentIndex - 1]);
    }
  }, [currentIndex, images, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setIsImageLoaded(false);
      setZoomed(false);
      onNavigate(images[currentIndex + 1]);
    }
  }, [currentIndex, images, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'f' || e.key === 'F') onToggleFavorite(image);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, handlePrev, handleNext, onToggleFavorite, image]);

  const handleDownload = async (url, quality) => {
    setDownloading(true);
    const filename = `imagefinder-${image.id.split('-')[1]}-${quality}.jpg`;
    await onDownload({ ...image, srcOriginal: url }, filename);
    setDownloading(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleShare = async () => {
    const shareUrl = image.sourceUrl;
    if (navigator.share) {
      try {
        await navigator.share({ title: image.alt, url: shareUrl });
      } catch { /* user cancelled */ }
    } else {
      onCopyLink(image);
    }
  };

  if (!image) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}><FiX /></button>

        {currentIndex > 0 && (
          <button className="modal-nav modal-nav-prev" onClick={handlePrev}><FiChevronLeft /></button>
        )}
        {currentIndex < images.length - 1 && (
          <button className="modal-nav modal-nav-next" onClick={handleNext}><FiChevronRight /></button>
        )}

        <div className="modal-content">
          <div className={`modal-image-section ${zoomed ? 'zoomed' : ''}`}>
            {!isImageLoaded && (
              <div className="modal-image-loader"><div className="spinner-large" /></div>
            )}
            <img
              src={image.srcLarge}
              alt={image.alt}
              className={`modal-image ${isImageLoaded ? 'loaded' : ''} ${zoomed ? 'zoomed' : ''}`}
              onLoad={() => setIsImageLoaded(true)}
              onClick={() => setZoomed(!zoomed)}
              style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in' }}
            />
          </div>

          <div className="modal-info">
            <div className="modal-header">
              <div className="modal-counter">{currentIndex + 1} / {images.length}</div>
              <div className="modal-header-actions">
                <button
                  className={`modal-action-btn ${favorited ? 'favorited' : ''}`}
                  onClick={() => onToggleFavorite(image)}
                  title={favorited ? t.removeFromFavorites : t.addToFavorites}
                >
                  <FiHeart />
                </button>
                <button
                  className="modal-action-btn"
                  onClick={() => onCopyLink(image)}
                  title={t.copyLink}
                >
                  <FiCopy />
                </button>
                <button
                  className="modal-action-btn"
                  onClick={handleShare}
                  title={t.share}
                >
                  <FiShare2 />
                </button>
              </div>
            </div>

            <div className="modal-photographer">
              <div className="photographer-avatar"><FiUser /></div>
              <div>
                <a href={image.photographerUrl} target="_blank" rel="noopener noreferrer" className="photographer-name">
                  {image.photographer}
                </a>
                <span className="photographer-source">{image.source}</span>
              </div>
            </div>

            <div className="modal-stats">
              {image.likes > 0 && (
                <div className="stat-item">
                  <FiHeart className="stat-icon" />
                  <span>{image.likes.toLocaleString()}</span>
                  <span className="stat-label">{t.likes}</span>
                </div>
              )}
              {image.views > 0 && (
                <div className="stat-item">
                  <FiEye className="stat-icon" />
                  <span>{image.views.toLocaleString()}</span>
                  <span className="stat-label">{t.views}</span>
                </div>
              )}
              {image.downloads > 0 && (
                <div className="stat-item">
                  <FiDownload className="stat-icon" />
                  <span>{image.downloads.toLocaleString()}</span>
                  <span className="stat-label">{t.downloads}</span>
                </div>
              )}
              <div className="stat-item">
                <FiMaximize className="stat-icon" />
                <span>{image.width} x {image.height}</span>
                <span className="stat-label">{t.resolution}</span>
              </div>
            </div>

            {image.tags && image.tags.length > 0 && (
              <div className="modal-tags">
                <span className="tags-label">{t.tagsLabel}</span>
                <div className="tags-list">
                  {image.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="download-section">
              <h4 className="download-title">{t.downloadTitle}</h4>
              <div className="download-options">
                <button className="download-btn" onClick={() => handleDownload(image.src, 'medium')} disabled={downloading}>
                  <FiDownload />
                  <div>
                    <span className="download-size">{t.medium}</span>
                    <span className="download-desc">{t.mediumDesc}</span>
                  </div>
                </button>
                <button className="download-btn featured" onClick={() => handleDownload(image.srcLarge, 'large')} disabled={downloading}>
                  <FiDownload />
                  <div>
                    <span className="download-size">{t.large}</span>
                    <span className="download-desc">{t.largeDesc}</span>
                  </div>
                </button>
                <button className="download-btn" onClick={() => handleDownload(image.srcOriginal, 'original')} disabled={downloading}>
                  <FiDownload />
                  <div>
                    <span className="download-size">{t.original}</span>
                    <span className="download-desc">{t.originalDesc}</span>
                  </div>
                </button>
              </div>
              {downloading && (
                <div className="download-progress">
                  <div className="btn-spinner" /> {t.downloading}
                </div>
              )}
            </div>

            <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer" className="view-source-link">
              <FiExternalLink />
              {t.viewOnSource}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
