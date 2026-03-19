import React from 'react';
import Masonry from 'react-masonry-css';
import ImageCard from './ImageCard';

const breakpointColumns = {
  default: 4,
  1400: 3,
  1000: 2,
  600: 1,
};

const ImageGrid = ({ images, onOpenModal, onDownload }) => {
  if (images.length === 0) return null;

  return (
    <div className="image-grid-container">
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
          />
        ))}
      </Masonry>
    </div>
  );
};

export default ImageGrid;
