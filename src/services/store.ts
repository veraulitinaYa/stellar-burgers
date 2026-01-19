import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { burgerIngredientReducer } from './burger-ingredient-files/burger-ingredient-slice';
import { burgerConstructorReducer } from './burger-constructor-files/burger-constructor-slice';
import { feedReducer } from './feed-files/feed-slice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { orderReducer } from './order-files/order-slice';

export const rootReducer = combineReducers({
  ingredients: burgerIngredientReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer
  // заменить на импорт настоящего редьюсера
});

//=========================== стор из заготовки===========================
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

//=========================================================================
