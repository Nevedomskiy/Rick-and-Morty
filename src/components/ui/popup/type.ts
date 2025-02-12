import { ReactNode } from 'react';

export type TPopupProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};
