import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { BURGER_INGREDIENT_SLICE_NAME } from '../slice-names';

export const fetchIngredientThunk = createAsyncThunk<
  TIngredient[],
  void,          
  {
    rejectValue: string;
    state: {
      burgerIngredients: {
        isFeteched: boolean;
      };
    };
  }
>(
  `${BURGER_INGREDIENT_SLICE_NAME}/fetchIngredients`,
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await getIngredientsApi();
      return ingredients;
    } catch {
      return rejectWithValue('Ошибка загрузки ингредиентов');
    }
  },
  {
    condition: (_, { getState }) => {
      const { isFeteched } = getState().burgerIngredients;

 
      if (isFeteched) {
        return false;
      }
    }
  }
);
