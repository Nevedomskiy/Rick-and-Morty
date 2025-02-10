import { TCharacter } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  selectCharacters,
  selectSelectedCharacters
} from '../../../services/slices/charactersSlice';
import { useSelector } from '../../../services/store/store';
import styles from './character.module.css';
export const Character: FC = () => {
  const navigate = useNavigate();
  const [character, setCharacter] = useState<TCharacter>({
    id: 1,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: ''
    },
    location: {
      name: '',
      url: ''
    },
    image: '',
    episode: [''],
    url: '',
    created: ''
  });
  const characters: TCharacter[] = useSelector(selectCharacters);
  const selectedCharacters: TCharacter[] = useSelector(
    selectSelectedCharacters
  );
  const location = useLocation();
  const { id } = useParams();
  useEffect(() => {
    if (location.pathname.includes('selected-characters')) {
      if (selectedCharacters.length !== 0) {
        setCharacter(
          selectedCharacters.find(
            (item) => item.id === Number(id)
          ) as TCharacter
        );
      } else {
        navigate('/');
      }
    } else {
      if (characters.length !== 0) {
        setCharacter(
          characters.find((item) => item.id === Number(id)) as TCharacter
        );
      }
    }
  }, [id, selectedCharacters, characters]);
  if (character.name === '') {
    return <></>;
  }

  let episodes: string = '';
  if (character.episode.length !== 0) {
    episodes = character.episode.map((url) => url.split('/').pop()).join(', ');
  }
  return (
    <div className={styles.character}>
      <div className={styles.character__header}>
        <img
          className={styles.character__image}
          src={character.image}
          alt={`Hero ${character.name}`}
        />
        <div className={styles.info}>
          <div className={styles.info__section}>
            <h2 className={styles.info__title}>Name:</h2>
            <p className={styles.info__status}>{character.name}</p>
          </div>
          <div className={styles.info__section}>
            <h2 className={styles.info__title}>Status:</h2>
            <p
              className={`${styles.info__status} ${character.status.toLowerCase().indexOf('alive') !== -1 ? styles.info__status_green : ''} ${character.status.toLowerCase().indexOf('dead') !== -1 ? styles.info__status_red : ''}`}
            >
              {character.status}
            </p>
          </div>
          <div className={styles.info__section}>
            <h2 className={styles.info__title}>Species:</h2>
            <p className={styles.info__status}>{character.species}</p>
          </div>
        </div>
      </div>
      <div className={styles.character__main}>
        <div className={styles.main__section}>
          <h2 className={styles.main__title}>Gender:</h2>
          <p className={styles.main__status}>{character.gender}</p>
        </div>
        <div className={styles.main__section}>
          <h2 className={styles.main__title}>Last known location:</h2>
          <p className={styles.main__status}>{character.origin.name}</p>
        </div>
        <div className={styles.main__section}>
          <h2 className={styles.main__title}>First seen in:</h2>
          <p className={styles.main__status}>{character.location.name}</p>
        </div>
        <div className={styles.main__section}>
          <h2 className={styles.main__title}>Created:</h2>
          <p className={styles.main__status}>
            {character.created.split('T')[0]}
          </p>
        </div>
        <div className={styles.main__section}>
          <h2 className={styles.main__title}>Met in episodes:</h2>
          <p className={styles.main__status}>{episodes}</p>
        </div>
      </div>
    </div>
  );
};
