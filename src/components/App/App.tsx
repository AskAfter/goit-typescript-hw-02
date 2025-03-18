import { useState, useEffect } from 'react';
import s from './App.module.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';
import fetchImages from '../../services/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Image } from '../../types';


interface FetchImagesResponse {
  total_pages: number;
  results: Image[];
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleClick = () => {
    if (totalPages !== null && page < totalPages) {
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

    const gallery = document.querySelector('#image-gallery');
    if (gallery) {
      const cardHeight =
        (gallery.firstElementChild as HTMLElement | null)?.getBoundingClientRect().height || 0;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }, [images, page]);

  const handleSubmit = (newQuery: string) => {
    if (newQuery !== query) {
      setQuery(newQuery);
    setImages([]);
    setPage(1);
    }
  };

  const openModal = (image: Image) => {
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
      {page < (totalPages ?? 0) && !isError && (
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
