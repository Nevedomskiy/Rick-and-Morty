import { FC, memo } from 'react';

import styles from './modal.module.css';

import { ModalOverlayUI } from '@ui';
import { TModalUIProps } from './type';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.button} type='button'>
            <button
              className={styles.button_icon}
              type='button'
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
