import { FC } from 'react';
import styles from './preloader.module.css';
const preloaderGif = require('../../../assets/images/portal-rick-and-morty');

export const Preloader: FC = () => (
  <img
    src={preloaderGif}
    alt='Preloader portal Rick and Morty'
    className={styles.preloader}
  />
);
