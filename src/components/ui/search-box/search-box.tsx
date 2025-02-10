import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getSearchCharacters,
  selectSearchValue,
  selectSearchValueSelected,
  selectSelectedCharacters,
  selectValidationError,
  setUpdateSearchValue,
  setUpdateSearchValueSelected,
  setUpdateSelectedCharacters,
  setUpdateValidationError
} from '../../../services/slices/charactersSlice';
import { useDispatch, useSelector } from '../../../services/store/store';
import styles from './search-box.module.css';
export const SearchBox: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchValue: string = useSelector(selectSearchValue);
  const searchValueSelected: string = useSelector(selectSearchValueSelected);
  const selectedCharacters = useSelector(selectSelectedCharacters);
  const isError: boolean = useSelector(selectValidationError);
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[A-Za-z]+$/;
    if (location.pathname === '/') {
      dispatch(setUpdateSearchValue(e.target.value));
      if (regex.test(e.target.value)) {
        dispatch(getSearchCharacters(e.target.value));
      }
    } else {
      dispatch(setUpdateSearchValueSelected(e.target.value));
      if (regex.test(e.target.value)) {
        const filteredArr = selectedCharacters.filter((item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        dispatch(setUpdateSelectedCharacters(filteredArr));
      }
    }
    dispatch(setUpdateValidationError(!regex.test(e.target.value)));
    if (e.target.value === '') {
      dispatch(setUpdateValidationError(false));
    }
  };

  return (
    <form
      className={styles.search}
      name='chatacters__form'
      onSubmit={(e) => {
        e.preventDefault();
      }}
      noValidate
    >
      <input
        type='text'
        name='chatacters-input'
        className={styles.input}
        placeholder='Find your favorite hero...'
        value={location.pathname === '/' ? searchValue : searchValueSelected}
        onInput={changeInput}
      />

      <span
        className={`${styles.input__error} ${
          isError ? styles.input__error_active : ''
        }`}
      >
        Please use English to search
      </span>
    </form>
  );
};
