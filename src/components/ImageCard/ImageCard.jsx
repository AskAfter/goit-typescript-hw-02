import s from './ImageCard.module.css';
import { AiOutlineUser, AiFillCamera, AiFillHeart } from 'react-icons/ai';

const ImageCard = ({
  src,
  largeSrc,
  alt,
  likes,
  userNick,
  userName,
  onClick,
}) => {
  return (
    <div className={s.container} onClick={onClick}>
      <img src={src} alt={alt} className={s.image} />
      <div className={s.infoContainer}>
        <div className={s.iconTextBlock}>
          <AiFillHeart className={s.icon} />
          <p className={s.cardText}>{likes}</p>
        </div>
        <div className={s.iconTextBlock}>
          <AiFillCamera className={s.icon} />
          <p className={s.cardText}>{userNick}</p>
        </div>
        <div className={s.iconTextBlock}>
          <AiOutlineUser className={s.icon} />
          <p className={s.cardText}>{userName}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
