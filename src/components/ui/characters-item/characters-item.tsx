import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  selectSelectedCharacters,
  setAddNewCharacter,
  setRemoveCharacter,
  setUpdatePopup
} from '../../../services/slices/charactersSlice';
import { useDispatch, useSelector } from '../../../services/store/store';
import { containsCharacter } from '../../../utils/metods';
import styles from './characters-item.module.css';
import { TCharacterItemProps } from './type';
export const CharactersItem: FC<TCharacterItemProps> = ({ character }) => {
  const dispatch = useDispatch();
  const selectedCharacters = useSelector(selectSelectedCharacters);
  const contain: boolean = containsCharacter(selectedCharacters, character);
  const [checked, setChecked] = useState(contain);
  const handleSelectCharacter = () => {
    if (!checked) {
      dispatch(setAddNewCharacter(character));
      localStorage.setItem(
        'selectedCharacters',
        JSON.stringify([...selectedCharacters, character])
      );
      dispatch(
        setUpdatePopup({
          isOpen: true,
          title: 'The hero has been saved',
          success: true
        })
      );
    } else {
      dispatch(setRemoveCharacter(character));
      const filteredArray = selectedCharacters.filter(
        (selectedCharacter) => selectedCharacter.id !== character.id
      );
      localStorage.setItem('selectedCharacters', JSON.stringify(filteredArray));
      dispatch(
        setUpdatePopup({
          isOpen: true,
          title: 'The hero has been deleted',
          success: false
        })
      );
    }
    setChecked((prev) => !prev);
  };

  return (
    <li>
      <article className={styles.item}>
        <Link to={`character/${character.id}`}>
          <div className={styles.character_info}>
            <img
              className={styles.image}
              src={character.image}
              alt={`Картинка ${character.name}`}
            />
            <div className={styles.content}>
              <div className={styles.section}>
                <h2 className={styles.name}>{character.name}</h2>
                <p>
                  <span
                    className={`${styles.status} ${character.status.toLowerCase().indexOf('alive') !== -1 ? styles.status_green : ''} ${character.status.toLowerCase().indexOf('dead') !== -1 ? styles.status_red : ''}`}
                  >
                    {character.status}
                  </span>
                  {` - ${character.gender} `}
                </p>
              </div>
              <div className={styles.section}>
                <span className={styles.title}>Last known location:</span>
                <p
                  className={`${styles.text} ${
                    character.origin.name === 'unknown' ? styles.location : ''
                  }`}
                >
                  {character.origin.name}
                </p>
              </div>
              <div className={styles.section}>
                <span className={styles.title}>First seen in:</span>
                <p className={styles.text}>{character.location.name}</p>
              </div>
            </div>
            <div className={styles.tooltip}>Read more</div>
          </div>
        </Link>
        <div className={styles.container}>
          <button
            className={`${styles.colorButton} ${checked ? styles.green : styles.orange}`}
            onClick={handleSelectCharacter}
          >
            {checked ? 'Delete  the hero' : 'Save the hero'}
          </button>
        </div>
      </article>
    </li>
  );
};
