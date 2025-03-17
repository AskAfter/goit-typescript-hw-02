import { DNA } from 'react-loader-spinner';
import s from './Loader.module.css'; // Імпортуємо стилі для лоадера

const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
