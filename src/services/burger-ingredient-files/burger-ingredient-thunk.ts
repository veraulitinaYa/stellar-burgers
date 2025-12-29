import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const fetchIngredientThunk = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);
