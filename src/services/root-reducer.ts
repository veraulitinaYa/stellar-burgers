import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from './burger-constructor-files/burger-constructor-slice';
import { burgerIngredientReducer } from './burger-ingredient-files/burger-ingredient-slice';
import { feedReducer } from './feed-files/feed-slice';
import { orderReducer } from './order-files/order-slice';
import { userReducer } from './user-files/user-slice';

export const rootReducer = combineReducers({
  ingredients: burgerIngredientReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer
});
