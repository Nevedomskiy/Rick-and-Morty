export interface ICountingPagesResult {
  pageCount: number;
  currentItems: TCharacter[];
}

export type TCountingPagesParams = {
  page: number;
};

export type TLocation = {
  name: string;
  url: string;
};

export type TCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: TLocation;
  location: TLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
};
