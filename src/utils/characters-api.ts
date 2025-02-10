import { TCharacter } from './types';

const URL = process.env.RICKANDMORTYAPI_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type TCharactersInfoResponse = {
  count: number | null;
  next: string;
  pages: number;
  prev: string | null;
};

export type TCharactersResponse = {
  info: TCharactersInfoResponse;
  results: TCharacter[];
};

export interface TFetchRequestProps {
  url: string;
}

export const getCharactersByPagNumber = (page: number) =>
  fetchWithRefresh<TCharactersResponse>(`${URL}/character/?page=${page}`, {
    method: 'GET'
  }).then((data) => {
    if (data?.info.count) {
      return { ...data, page };
    } else {
      return Promise.reject(data);
    }
  });

export const getCharactersBySearchValue = (search: string) =>
  fetchWithRefresh<TCharactersResponse>(`${URL}/character/?name=${search}`, {
    method: 'GET'
  }).then((data) => {
    if (data?.info.count) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });

export const getCharactersBySearchValueWithPage = (
  search: string,
  page: number
) =>
  fetchWithRefresh<TCharactersResponse>(
    `${URL}/character/?page=${page}&name=${search}`,
    {
      method: 'GET'
    }
  ).then((data) => {
    if (data) {
      return { ...data, page };
    } else {
      return Promise.reject(data);
    }
  });
