import { burgerIngredientReducer, initialState } from './burger-ingredient-slice';
import { fetchIngredientThunk } from './burger-ingredient-thunk';
import { TIngredient } from '@utils-types';
import { ingredientsMock } from './burger-ingredient-mock';

describe('Тест - редюсер burgerIngredient', () => {
  

  it('возвращает начальное состояние', () => {
    const result = burgerIngredientReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('обрабатывает fetchIngredientThunk.pending', () => {
    const action = { type: fetchIngredientThunk.pending.type };

    const state = burgerIngredientReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.isFetched).toBe(false);
  });

  it('обрабатывает fetchIngredientThunk.fulfilled', () => {
    const action = {
      type: fetchIngredientThunk.fulfilled.type,
      payload: ingredientsMock
    };

    const state = burgerIngredientReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.isFetched).toBe(true);
    expect(state.ingredients).toEqual(ingredientsMock);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fetchIngredientThunk.rejected', () => {
    const action = {
      type: fetchIngredientThunk.rejected.type,
      error: {
        message: 'Ошибка загрузки'
      }
    };

    const state = burgerIngredientReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
    expect(state.isFetched).toBe(false);
  });
});
