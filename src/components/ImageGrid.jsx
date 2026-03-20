import React from 'react';
import Masonry from 'react-masonry-css';
import ImageCard from './ImageCard';

const breakpointsBySize = {
  compact: { default: 5, 1400: 4, 1000: 3, 600: 2 },
  comfortable: { default: 4, 1400: 3, 1000: 2, 600: 1 },
  spacious: { default: 3, 1400: 2, 1000: 2, 600: 1 },
};

const ImageGrid = ({ images, onOpenModal, onDownload, onToggleFavorite, onCopyLink, gridSize = 'comfortable' }) => {
  if (images.length === 0) return null;

  const breakpointColumns = breakpointsBySize[gridSize] || breakpointsBySize.comfortable;

  return (
    <div className={`image-grid-container grid-${gridSize}`}>
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onOpenModal={onOpenModal}
            onDownload={onDownload}
            onToggleFavorite={onToggleFavorite}
            onCopyLink={onCopyLink}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default ImageGrid;
