import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import {
  getCharactersPage,
  getSearchCharactersByPage,
  selectSearchValue,
  setUpdateСurrentSelectedPage
} from '../../../services/slices/charactersSlice';
import { useDispatch, useSelector } from '../../../services/store/store';
import style from './pagination.module.css';
import { PageClickEvent, TCharacterItemProps } from './type';

export const PaginatedItems: FC<TCharacterItemProps> = ({
  currentPage,
  quantityPages
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchValue: string = useSelector(selectSearchValue);

  const handlePageClick = (event: PageClickEvent) => {
    if (location.pathname === '/') {
      if (searchValue) {
        dispatch(
          getSearchCharactersByPage({
            search: searchValue,
            page: Number(event.selected) + 1
          })
        );
      } else {
        dispatch(getCharactersPage(Number(event.selected) + 1));
      }
    } else if (location.pathname === '/selected-characters') {
      dispatch(setUpdateСurrentSelectedPage(Number(event.selected) + 1));
    }
  };

  if (quantityPages === undefined || currentPage === undefined) {
    return null;
  }

  return (
    <ReactPaginate
      className={style.list}
      breakLabel='...'
      nextLabel='next >'
      forcePage={currentPage - 1}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={quantityPages}
      previousLabel='< previous'
      renderOnZeroPageCount={null}
      pageLinkClassName={style.item}
      previousLinkClassName={style.previous}
      nextLinkClassName={style.next}
      breakClassName={style.break}
      disabledLinkClassName={style.disabled}
      activeLinkClassName={style.active}
    />
  );
};
