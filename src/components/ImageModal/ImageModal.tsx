import Modal from 'react-modal';
import s from './ImageModal.module.css';
import { FC } from 'react';
import { Image } from '../../types';

Modal.setAppElement('#root');

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={s.modal}
      overlayClassName={s.overlay}
    >
      {image && (
        <div>
          <img
            src={image.urls.regular}
            alt={image.alt_description || 'Image'}
            className={s.image}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
