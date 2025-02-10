import { TCharactersListProps } from '../../components/ui/characters-list/type';
import { TCharacterItemProps } from '../../components/ui/pagination/type';

export type TCharactersProps = TCharactersListProps &
  Omit<TCharacterItemProps, 'characters'>;
