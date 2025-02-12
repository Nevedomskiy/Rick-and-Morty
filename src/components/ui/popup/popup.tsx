import { FC, useEffect } from 'react';

import { ModalUI } from '@ui';
import {
  selectPopup,
  setUpdatePopup
} from '../../../services/slices/charactersSlice';
import { useDispatch, useSelector } from '../../../services/store/store';
import styles from './popup.module.css';
export const Popup: FC = () => {
  const dispatch = useDispatch();
  const { isOpen, title, success } = useSelector(selectPopup);

  const onClose = () => {
    dispatch(
      setUpdatePopup({
        isOpen: false,
        title: '',
        success: false
      })
    );
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.container_active : styles.container_disabled}`}
    >
      <ModalUI title={title} onClose={onClose}>
        <div>
          <div
            className={`${styles.popop__img} ${success ? styles.popop__img_true : styles.popop__img_false}`}
          />
        </div>
      </ModalUI>
    </div>
  );
};
