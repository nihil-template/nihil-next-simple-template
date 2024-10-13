import { atom, useRecoilState } from 'recoil';
import { localStorageEffect } from '@/src/utils';
import { configData } from '@/src/data';

const searchTypeAtom = atom<string>({
  key: 'search/searchType',
  default: '',
  effects: [
    localStorageEffect(`${configData.title}/search/searchType`),
  ],
});

const searchMessageAtom = atom<string>({
  key: 'search/searchMessage',
  default: '',
  effects: [
    localStorageEffect(`${configData.title}/search/searchMessage`),
  ],
});

const showSearchBarAtom = atom<boolean>({
  key: 'search/showSearchBar',
  default: false,
  effects: [
    localStorageEffect(`${configData.title}/search/showSearchBar`),
  ],
});

export function useCommonStore() {
  const [ searchType, setSearchType, ] = useRecoilState(searchTypeAtom);
  const [ searchMessage, setSearchMessage, ] = useRecoilState(searchMessageAtom);
  const [ showSearch, setShowSearch, ] = useRecoilState(showSearchBarAtom);

  return {
    searchType,
    searchMessage,
    showSearch,
    setSearchType,
    setSearchMessage,
    setShowSearch,
  };
}
