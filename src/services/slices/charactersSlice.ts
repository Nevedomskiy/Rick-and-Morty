import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getCharactersByPagNumber,
  getCharactersBySearchValue,
  getCharactersBySearchValueWithPage
} from '../../utils/characters-api';
import { TCharacter } from '../../utils/types';

export interface charactersState {
  characters: TCharacter[];
  character: TCharacter;
  selectedCharacters: TCharacter[];
  quantityPages: number;
  isLoading: boolean;
  isShowPreloader: boolean;
  popup: {
    isOpen: boolean;
    title: string;
    success: boolean;
  };
  currentPage: number;
  currentPageSelected: number;
  validationError: boolean;
  searchValue: string;
  searchValueSelected: string;
  error: null | string | undefined;
}

const initCharacter = {
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
};

const initialState: charactersState = {
  characters: [],
  character: initCharacter,
  selectedCharacters: [],
  isLoading: false,
  quantityPages: 0,
  currentPage: 1,
  currentPageSelected: 1,
  isShowPreloader: false,
  error: null,
  searchValue: '',
  searchValueSelected: '',
  validationError: false,
  popup: {
    isOpen: false,
    title: '',
    success: false
  }
};

export const getCharactersPage = createAsyncThunk(
  'characters/getCharacters',
  async (page: number) => {
    const res = await getCharactersByPagNumber(page);
    return res;
  }
);

export const getSearchCharacters = createAsyncThunk(
  'characters/getSearchCharacters',
  async (search: string) => {
    const res = await getCharactersBySearchValue(search);
    return res;
  }
);

interface SearchCharactersArgs {
  search: string;
  page: number;
}

export const getSearchCharactersByPage = createAsyncThunk<
  any,
  SearchCharactersArgs
>('characters/getSearchCharactersByPage', async ({ search, page }) => {
  const res = await getCharactersBySearchValueWithPage(search, page);
  return res;
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setLoadingFalse(state) {
      state.isLoading = false;
    },
    setUpdatePreloader: (state, action: PayloadAction<boolean>) => {
      state.isShowPreloader = action.payload;
    },
    setUpdatePopup: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
        title: string;
        success: boolean;
      }>
    ) => {
      state.popup = action.payload;
    },
    setUpdateSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      localStorage.setItem('searchValue', String(action.payload));
    },
    setUpdateSearchValueSelected: (state, action: PayloadAction<string>) => {
      state.searchValueSelected = action.payload;
      localStorage.setItem('searchValueSelected', String(action.payload));
    },
    setUpdateSelectedCharacters: (
      state,
      action: PayloadAction<TCharacter[]>
    ) => {
      state.selectedCharacters = action.payload;
    },
    setUpdateСurrentSelectedPage: (state, action: PayloadAction<number>) => {
      state.currentPageSelected = action.payload;
      localStorage.setItem('numberPaginationSelected', String(action.payload));
    },
    setUpdateValidationError: (state, action: PayloadAction<boolean>) => {
      state.validationError = action.payload;
    },
    setAddNewCharacter: (state, action: PayloadAction<TCharacter>) => {
      state.selectedCharacters = [...state.selectedCharacters, action.payload];
    },
    setRemoveCharacter: (state, action: PayloadAction<TCharacter>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (item) => item.id !== action.payload.id
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharactersPage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCharactersPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getCharactersPage.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem(
          'numberPaginationCharacters',
          String(action.payload.page)
        );
        state.characters = action.payload.results;
        state.currentPage = action.payload.page;
        state.quantityPages = action.payload.info.pages;
      })
      .addCase(getSearchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSearchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'ошибка получения данных';
      })
      .addCase(getSearchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload.results;
        state.currentPage = 1;
        state.quantityPages = action.payload.info.pages;
      })
      .addCase(getSearchCharactersByPage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSearchCharactersByPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSearchCharactersByPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload.results;
        state.currentPage = action.payload.page;
        state.quantityPages = action.payload.info.pages;
      });
  },
  selectors: {
    selectIsShowPreloader: (state) => state.isShowPreloader,
    selectCharacters: (state) => state.characters,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectCurrentPage: (state) => state.currentPage,
    selectCurrentPageSelected: (state) => state.currentPageSelected,
    selectSelectedCharacters: (state) => state.selectedCharacters,
    selectQuantityPages: (state) => state.quantityPages,
    selectSearchValue: (state) => state.searchValue,
    selectValidationError: (state) => state.validationError,
    selectSearchValueSelected: (state) => state.searchValueSelected,
    selectPopup: (state) => state.popup
  }
});

export const charactersReducer = charactersSlice.reducer;
export const {
  selectCharacters,
  selectIsLoading,
  selectPopup,
  selectCurrentPage,
  selectIsShowPreloader,
  selectError,
  selectQuantityPages,
  selectSelectedCharacters,
  selectCurrentPageSelected,
  selectSearchValue,
  selectSearchValueSelected,
  selectValidationError
} = charactersSlice.selectors;
export const {
  setUpdatePreloader,
  setUpdateСurrentSelectedPage,
  setAddNewCharacter,
  setUpdateSelectedCharacters,
  setRemoveCharacter,
  setUpdateValidationError,
  setUpdateSearchValue,
  setUpdateSearchValueSelected,
  setUpdatePopup
} = charactersSlice.actions;
