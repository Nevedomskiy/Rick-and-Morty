import { FC, memo } from 'react';

import styles from './modal.module.css';

import { ModalOverlayUI } from '@ui';
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.button} type='button'>
            <CloseIcon
              className={styles.button_icon}
              type='primary'
              onClick={onClose}
            />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
