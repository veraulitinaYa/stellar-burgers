import {createSlice} from '@reduxjs/toolkit';
import { BURGER_CONSTRUCTOR_SLICE_NAME } from './slice-names';
import { TIngredient, TConstructorIngredient } from '@utils-types';

//типизируем стейт
export interface BurgerConstructorState {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
}

//начальное состояние
const initialState: BurgerConstructorState = {
    bun: null,
    ingredients: []
}

// слайс
// const burgerConstructorSlice = createSlice({
//     name: BURGER_CONSTRUCTOR_SLICE_NAME,
    
// })
