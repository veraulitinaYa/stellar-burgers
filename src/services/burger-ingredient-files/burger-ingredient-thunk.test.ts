import { fetchIngredientThunk } from './burger-ingredient-thunk';
import { getIngredientsApi } from '../../utils/burger-api';
import { ingredientsMock } from './burger-ingredient-mock';

jest.mock('../../utils/burger-api');

describe('Тест - тханк fetchIngredient', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  afterEach(() => jest.clearAllMocks());

  it('диспатчит pending при старте thunk', async () => {
    (getIngredientsApi as jest.Mock).mockResolvedValue(ingredientsMock);

    const thunk = fetchIngredientThunk();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchIngredientThunk.pending.type
      })
    );
  });

  it('диспатчит fulfilled, когда API успешно возвращает данные', async () => {
    (getIngredientsApi as jest.Mock).mockResolvedValue(ingredientsMock);

    const thunk = fetchIngredientThunk();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchIngredientThunk.fulfilled.type,
        payload: ingredientsMock
      })
    );
  });

  it('диспатчит rejected, когда API выбрасывает ошибку', async () => {
    (getIngredientsApi as jest.Mock).mockRejectedValue(new Error('Ошибка API'));

    const thunk = fetchIngredientThunk();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchIngredientThunk.rejected.type,
        error: expect.objectContaining({ message: 'Ошибка API' })
      })
    );
  });
});
