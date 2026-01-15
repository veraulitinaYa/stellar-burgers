import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BURGER_CONSTRUCTOR_SLICE_NAME } from '../slice-names';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { nanoid } from 'nanoid';

//типизируем стейт
export interface BurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

//начальное состояние
const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

//слайс

const burgerConstructorSlice = createSlice({
  name: BURGER_CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        console.log('Из слайса БУЛКА инфа по стейт' + JSON.stringify(state));
        console.log('Из слайса БУЛКА инфа по payload' + JSON.stringify(action));
        state.bun = action.payload;
      } else {
        console.log('Из слайса ИНГР инфа по стейт' + JSON.stringify(state));
        console.log('Из слайса ИНГР инфа по payload' + JSON.stringify(action));
        state.ingredients.push({
          ...action.payload,
          id: nanoid()
        });
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedItem] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, movedItem);
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
