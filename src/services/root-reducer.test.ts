import { rootReducer } from './root-reducer';

import { initialState as ingredientsInitialState } from './burger-ingredient-files/burger-ingredient-slice';
import { initialState as constructorInitialState } from './burger-constructor-files/burger-constructor-slice';
import { initialState as orderInitialState } from './order-files/order-slice';
import { initialState as feedInitialState } from './feed-files/feed-slice';
import { initialState as userInitialState } from './user-files/user-slice';

const unknownAction = { type: 'UNKNOWN_ACTION' };

describe('тест - rootReducer - undefined state и unknown action', () => {
  it('rootReducer не падает и инициализируется с undefined state и unknown action', () => {
    const state = rootReducer(undefined, unknownAction);
    expect(state).toBeDefined();
  });
});

describe('тест - rootReducer - проверка initial state', () => {
  it('rootReducer возвращает корректное начальное состояние всех слайсов', () => {
    const state = rootReducer(undefined, unknownAction);

    expect(state.ingredients).toEqual(ingredientsInitialState);
    expect(state.burgerConstructor).toEqual(constructorInitialState);
    expect(state.order).toEqual(orderInitialState);
    expect(state.feed).toEqual(feedInitialState);
    expect(state.user).toEqual(userInitialState);
  });
});

describe('тест - rootReducer - проверка ключей', () => {
  it('rootReducerсодержит все ключи стора', () => {
    const state = rootReducer(undefined, unknownAction);

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');
  });
});
