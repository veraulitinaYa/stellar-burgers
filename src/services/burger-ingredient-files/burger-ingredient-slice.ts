import {createSlice} from '@reduxjs/toolkit';
import { BURGER_INGREDIENT_SLICE_NAME } from '../slice-names';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { fetchIngredientThunk } from './burger-ingredient-thunk';

//типизируем стейт
export interface BurgerIngredientState {
   ingredients: TIngredient[];
   isLoading: boolean;
   isFeteched: boolean;
   error: string | null;
}

//начальное состояние
const initialState: BurgerIngredientState = {
    ingredients: [],
    isLoading: false,
    isFeteched: false,
    error: null
}

// слайс
const burgerIngredientSlice = createSlice({
    name: BURGER_INGREDIENT_SLICE_NAME,
    initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredientThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFeteched = true;
        state.ingredients = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredientThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  }
});

export const burgerIngredientReducer = burgerIngredientSlice.reducer;
