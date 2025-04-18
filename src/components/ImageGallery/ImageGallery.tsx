import { FC } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';
import { Image } from '../../types';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div>
      <ul id="image-gallery" className={s.list}>
        {images.map((image: Image) => (
          <li key={image.id}>
            <ImageCard
              src={image.urls.small}
              largeSrc={image.urls.regular}
              alt={image.alt_description || 'Image'}
              likes={image.likes ?? 0}
              userNick={image.user?.username || 'Unknown'}
              userName={image.user?.name || 'Unknown User'}
              onClick={() => onImageClick(image)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
