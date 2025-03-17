import { useState, useEffect } from 'react';
import s from './App.module.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';
import fetchImages from '../../services/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };
  useEffect(() => {
    if (!query) return;
    const getImages = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);
        setTotalPages(data.total_pages);
        setImages(prev => [...prev, ...data.results]);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  useEffect(() => {
    if (page === 1) return;

    const gallery = document.querySelector('#image-gallery'); // Отримуємо галерею
    if (gallery) {
      const cardHeight =
        gallery.firstElementChild?.getBoundingClientRect().height || 0;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }, [images, page]);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className={s.container}>
      {!isModalOpen && <SearchBar onSubmit={handleSubmit} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {page < totalPages && !isError && (
        <LoadMoreBtn handleClick={handleClick} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}

export default App;
