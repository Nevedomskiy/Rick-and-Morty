import { BackMenu, CharactersList, PaginatedItems, Preloader } from '@ui';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import {
  selectError,
  selectIsLoading,
  setUpdateSearchValue
} from '../../services/slices/charactersSlice';
import { useDispatch, useSelector } from '../../services/store/store';
import styles from './characters.module.css';
import { TCharactersProps } from './type';
export const Characters: FC<TCharactersProps> = ({
  characters,
  currentPage,
  quantityPages
}) => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading: boolean = useSelector(selectIsLoading);

  const resetSearch = () => {
    dispatch(setUpdateSearchValue(''));
  };

  return (
    <>
      <Outlet />
      <section className={styles.characters}>
        {isLoading ? <Preloader /> : null}
        {error === 'ошибка получения данных' ? (
          <BackMenu
            text='No characters were found for this query.'
            textBtn='Clear the search'
            onClick={resetSearch}
          />
        ) : (
          <>
            <PaginatedItems
              characters={characters.length}
              currentPage={currentPage}
              quantityPages={quantityPages}
            />
            <CharactersList characters={characters} />
            <PaginatedItems
              characters={characters.length}
              currentPage={currentPage}
              quantityPages={quantityPages}
            />
          </>
        )}
      </section>
    </>
  );
};
