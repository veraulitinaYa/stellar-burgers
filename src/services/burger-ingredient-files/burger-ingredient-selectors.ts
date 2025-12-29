import { RootState } from '../../services/store';
import { TIngredient } from '@utils-types';

export const selectIngredients = (state: RootState): TIngredient[] =>
  state.ingredients.ingredients;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectIngredientsFetched = (state: RootState) =>
  state.ingredients.isFetched;

export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectBuns = (state: RootState) =>
  state.ingredients.ingredients.filter((i) => i.type === 'bun');

export const selectMains = (state: RootState) =>
  state.ingredients.ingredients.filter((i) => i.type === 'main');

export const selectSauces = (state: RootState) =>
  state.ingredients.ingredients.filter((i) => i.type === 'sauce');
