import Modal from 'react-modal';
import s from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, image }) => {
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
            alt={image.alt_description}
            className={s.image}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
