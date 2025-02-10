export type TCharacterItemProps = {
  currentPage: number | undefined;
  quantityPages: number | undefined;
  characters?: number;
};

export type PageClickEvent = {
  selected: number;
};
