import {createSlice} from '@reduxjs/toolkit';
import { BURGER_INGREDIENT_SLICE_NAME } from './slice-names';
import { TIngredient, TConstructorIngredient } from '@utils-types';

//типизируем стейт
export interface BurgerIngredientState {
   ingredients: TIngredient[];
   isLoading: boolean;
   error: string | null;
}

//начальное состояние
const initialState: BurgerIngredientState = {
    ingredients: [],
    isLoading: false,
    error: null
}

// слайс
const burgerIngredientSlice = createSlice({
    name: BURGER_INGREDIENT_SLICE_NAME,
    initialState,
    reducers:{},
})
