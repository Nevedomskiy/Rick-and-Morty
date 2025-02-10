import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './back-menu.module.css';
import { BackMenuProps } from './type';

export const BackMenu: FC<BackMenuProps> = ({ text, textBtn, onClick }) => (
  <div className={styles.empty_list}>
    <p>{text}</p>
    <NavLink to={'/'} onClick={onClick} className={styles.link}>
      {textBtn}
    </NavLink>
  </div>
);
