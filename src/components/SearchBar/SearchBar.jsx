import { useState } from 'react';
import s from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (value === '') {
      toast.error('fill search field', {
        style: {
          padding: '16px',
          color: 'white',
          background: '#1f4564',
        },
        iconTheme: {
          primary: '#802000',
          secondary: '#FFFAEE',
        },
        duration: 1000,
      });
      return;
    }
    onSubmit(value);
    setValue('');
  };
  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.inputWrapper}>
          <AiOutlineSearch className={s.icon} />
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={e => setValue(e.target.value.trim())}
            value={value}
          />
        </div>
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
