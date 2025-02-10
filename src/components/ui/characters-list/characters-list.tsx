import { BackMenu, CharactersItem } from '@ui';
import { TCharacter } from '@utils-types';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { selectSelectedCharacters } from '../../../services/slices/charactersSlice';
import { useSelector } from '../../../services/store/store';

import styles from './characters-list.module.css';
import { TCharactersListProps } from './type';

export const CharactersList: FC<TCharactersListProps> = ({ characters }) => {
  const location = useLocation();
  const selectedCharacters = useSelector(selectSelectedCharacters);
  useEffect(() => {}, [selectedCharacters]);

  if (characters.length === 0 && location.pathname === '/selected-characters') {
    return (
      <BackMenu
        text='The favorites list is empty. Add characters from the main page!'
        textBtn='Back to the heroes'
      />
    );
  }

  return (
    <ul className={styles.characters_list}>
      {characters.map((item: TCharacter) => (
        <CharactersItem character={item} key={item.id} />
      ))}
    </ul>
  );
};
