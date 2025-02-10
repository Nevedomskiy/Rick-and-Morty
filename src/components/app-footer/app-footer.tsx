import { FC } from 'react';
import styles from './app-footer.module.css';
export const AppFooter: FC = () => (
  <footer className={styles.footer}>
    <h3>This project was completed as a test task</h3>
    <p>Made with the soul 07.02.2025</p>
    <p>
      Author:
      <a
        href='https://t.me/VasiliyNevedomskiy'
        target='_blank'
        className={styles.link}
      >
        «Nevedomsky Vasiliy»
      </a>
    </p>
  </footer>
);
