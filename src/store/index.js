import React from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';

// 初期値
const initialState = {
  popular: [],
  selected: {},
  related: [],
  term: '',
  searched: [],
};

// reducer = 二つの値をとり、一方をとる
const reducer = (state, action) => {
  switch (action.type) {
    // "SET＿POPULAR”って何？
    // stateの更新はスプレッド構文でやらんとあかん　別のstateが消えてしまう
    case 'SET_POPULAR':
      // payloadはデータ本体のことらしい
      return { ...state, popular: action.payload.popular };
    case 'SET_RELATED':
      return { ...state, related: action.payload.related };
    case 'SET_SELECTED':
      return { ...state, selected: action.payload.selected };
    case 'SET_TERM':
      return { ...state, term: action.payload.term };
    case 'SET_SEARCHED':
      return { ...state, searched: action.payload.searched };
    default:
      return state;
  }
};

export const Store = createContext({
  globalState: initialState,
  setGloabalState: () => null,
});

export const StoreProvider = ({ children }) => {
  const [globalState, setGloabalState] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ globalState, setGloabalState }}>
      {children}
    </Store.Provider>
  );
};
