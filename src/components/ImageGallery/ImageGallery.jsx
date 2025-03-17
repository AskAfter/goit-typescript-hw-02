import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div>
      <ul id="image-gallery" className={s.list}>
        {images.map(image => (
          <li key={image.id}>
            <ImageCard
              src={image.urls.small}
              largeSrc={image.urls.regular}
              alt={image.alt_description}
              likes={image.likes}
              userNick={image.user.username}
              userName={image.user.name}
              onClick={() => onImageClick(image)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
