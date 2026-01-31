import {
  burgerConstructorReducer,
  initialState,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './burger-constructor-slice';

import { TIngredient } from '@utils-types';

jest.mock('nanoid', () => ({
  nanoid: () => 'test-id'
}));

describe('Тест - редюсер burgerConstructor', () => {
  const bun: TIngredient = {
    _id: 'bun-id',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const ingredient: TIngredient = {
    _id: 'ing-id',
    name: 'Котлета',
    type: 'main',
    proteins: 20,
    fat: 15,
    carbohydrates: 5,
    calories: 250,
    price: 80,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('возвращает начальное состояние', () => {
    const result = burgerConstructorReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('добавляет булку', () => {
    const state = burgerConstructorReducer(initialState, addIngredient(bun));

    expect(state.bun).toEqual({
      ...bun,
      id: 'test-id'
    });
    expect(state.ingredients).toHaveLength(0);
  });

  it('добавляет ингредиент', () => {
    const state = burgerConstructorReducer(
      initialState,
      addIngredient(ingredient)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...ingredient,
      id: 'test-id'
    });
  });

  it('удаляет ингредиент по id', () => {
    const filledState = {
      bun: null,
      ingredients: [{ ...ingredient, id: 'remove-me' }]
    };

    const state = burgerConstructorReducer(
      filledState,
      removeIngredient('remove-me')
    );

    expect(state.ingredients).toHaveLength(0);
  });

  it('перемещает ингредиент', () => {
    const filledState = {
      bun: null,
      ingredients: [
        { ...ingredient, id: '1', name: 'Первый' },
        { ...ingredient, id: '2', name: 'Второй' }
      ]
    };

    const state = burgerConstructorReducer(
      filledState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });

  it('очищает конструктор', () => {
    const filledState = {
      bun: { ...bun, id: 'bun-id' },
      ingredients: [{ ...ingredient, id: 'ing-id' }]
    };

    const state = burgerConstructorReducer(filledState, clearConstructor());

    expect(state).toEqual(initialState);
  });
});
