import { CharactersIcon } from '@ui';
import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
export const AppHeader: FC = () => {
  const location = useLocation();
  const [color, setColor] = useState('');

  useEffect(() => {
    if (location.pathname === '/') {
      setColor('#ff9800');
    } else {
      setColor('#272b33');
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <NavLink to={`/`} className={styles.menu__logo}>
        <CharactersIcon size={{ width: 40, height: 40 }} color={color} />
      </NavLink>
      <NavLink
        to={location.pathname === '/' ? `/selected-characters` : '/'}
        className={styles.link}
      >
        {location.pathname === '/' ? 'Selected characters' : 'All characters'}
      </NavLink>
    </header>
  );
};
