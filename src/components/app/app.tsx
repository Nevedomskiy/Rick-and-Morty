import { Characters } from '@pages';
import { TCharacter } from '@utils-types';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import '../../../public/fonts/fonts';
// eslint-disable-next-line
import '../../index.css';
import {
  getCharactersPage,
  getSearchCharacters,
  selectCharacters,
  selectCurrentPage,
  selectCurrentPageSelected,
  selectQuantityPages,
  selectSearchValue,
  selectSearchValueSelected,
  selectSelectedCharacters,
  setUpdateSearchValue,
  setUpdateSearchValueSelected,
  setUpdateSelectedCharacters,
  setUpdateСurrentSelectedPage
} from '../../services/slices/charactersSlice';
import { useDispatch, useSelector } from '../../services/store/store';
import { AppFooter } from '../app-footer';
import { AppHeader } from '../app-header';
import { Modal } from '../modal';
import { Character } from '../ui/character';
import { HeroBanner } from '../ui/hero-banner';
import styles from './app.module.css';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const currentSelectedPage = useSelector(selectCurrentPageSelected);
  const quantityPages = useSelector(selectQuantityPages);
  const characters = useSelector(selectCharacters);
  const selectedCharacters = useSelector(selectSelectedCharacters);
  const searchValue: string = useSelector(selectSearchValue);
  const searchValueSelected: string = useSelector(selectSearchValueSelected);
  function countingPages(page: number): {
    pageCount: number;
    currentItems: TCharacter[];
  } {
    //захардкодил количество карточек на странице, при необходимости можно вынести в параметры функции
    const endOffset = Number(page) * 2;
    const itemOffset = endOffset - 2;
    const currentItems = selectedCharacters.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(selectedCharacters.length / 2);
    return { pageCount, currentItems };
  }
  const { pageCount, currentItems } = countingPages(currentSelectedPage);

  const closeModal = () => {
    if (location.pathname.indexOf('selected-characters') !== -1) {
      navigate('/selected-characters');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const savedSelectedCharacters = localStorage.getItem('selectedCharacters');
    if (savedSelectedCharacters && searchValueSelected === '') {
      dispatch(
        setUpdateSelectedCharacters(JSON.parse(savedSelectedCharacters))
      );
    }

    if (location.pathname.indexOf('selected-characters') === -1) {
      const searchValue = localStorage.getItem('searchValue');
      const numberPaginationCharacters = localStorage.getItem(
        'numberPaginationCharacters'
      );
      if (searchValue) {
        if (currentPage === 1) {
          dispatch(setUpdateSearchValue(searchValue));
          dispatch(getSearchCharacters(searchValue));
        }
      } else {
        if (numberPaginationCharacters) {
          dispatch(getCharactersPage(Number(numberPaginationCharacters)));
        } else {
          dispatch(getCharactersPage(1));
        }
      }
    } else if (location.pathname.indexOf('selected-characters') !== -1) {
      const searchValueSelectedLocal = localStorage.getItem(
        'searchValueSelected'
      );
      const numberPaginationSelectedCharacters = localStorage.getItem(
        'numberPaginationSelected'
      );
      if (searchValueSelectedLocal) {
        dispatch(setUpdateSearchValueSelected(searchValueSelectedLocal));
      } else {
        if (numberPaginationSelectedCharacters) {
          dispatch(
            setUpdateСurrentSelectedPage(
              Number(numberPaginationSelectedCharacters)
            )
          );
        } else {
          dispatch(setUpdateСurrentSelectedPage(1));
        }
      }
    }
  }, [location, searchValue, searchValueSelected]);

  if (currentItems.length === 0 && currentSelectedPage !== 1) {
    dispatch(setUpdateСurrentSelectedPage(currentSelectedPage - 1));
  }
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <HeroBanner />
        <Routes>
          <Route
            path='/'
            element={
              <Characters
                characters={characters}
                currentPage={currentPage}
                quantityPages={quantityPages}
              />
            }
          >
            <Route
              path='character/:id'
              element={
                <Modal title='Information about the hero' onClose={closeModal}>
                  <Character />
                </Modal>
              }
            />
          </Route>
          <Route
            path='/selected-characters'
            element={
              <Characters
                characters={currentItems}
                currentPage={currentSelectedPage}
                quantityPages={pageCount}
              />
            }
          >
            {' '}
            <Route
              path='character/:id'
              element={
                <Modal title='Information about the hero' onClose={closeModal}>
                  <Character />
                </Modal>
              }
            />
          </Route>
        </Routes>
      </main>
      <AppFooter />
    </div>
  );
};

export default App;
