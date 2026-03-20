import React from 'react';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import { useLang } from '../i18n/LanguageContext';
import ImageGrid from './ImageGrid';

const FavoritesView = ({ favorites, onBack, onOpenModal, onDownload, onToggleFavorite, onCopyLink, gridSize }) => {
  const { t } = useLang();

  return (
    <div className="favorites-view">
      <div className="favorites-header">
        <button className="back-btn" onClick={onBack}>
          <FiArrowLeft />
          <span>{t.backToSearch}</span>
        </button>
        <div className="favorites-title-section">
          <h1 className="favorites-title">
            <FiHeart className="favorites-title-icon" />
            {t.yourFavorites}
          </h1>
          <p className="favorites-subtitle">{t.favoritesSubtitle(favorites.length)}</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><FiHeart /></div>
          <h2 className="empty-title">{t.favoritesEmptyTitle}</h2>
          <p className="empty-description">{t.favoritesEmptyDesc}</p>
        </div>
      ) : (
        <ImageGrid
          images={favorites}
          onOpenModal={onOpenModal}
          onDownload={onDownload}
          onToggleFavorite={onToggleFavorite}
          onCopyLink={onCopyLink}
          gridSize={gridSize}
        />
      )}
    </div>
  );
};

export default FavoritesView;
