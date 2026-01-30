import { userReducer, initialState } from './user-slice';
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk
} from './user-thunks';
import { userMock, updateUserResponseMock } from './user-mock';

describe('Тест - редюсер user', () => {
  it('возвращает начальное состояние', () => {
    const state = userReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  // --- registerUserThunk ---
  it('обрабатывает registerUserThunk.pending', () => {
    const state = userReducer(initialState, { type: registerUserThunk.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает registerUserThunk.fulfilled', () => {
    const state = userReducer(initialState, {
      type: registerUserThunk.fulfilled.type,
      payload: userMock
    });

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  it('обрабатывает registerUserThunk.rejected', () => {
    const state = userReducer(initialState, {
      type: registerUserThunk.rejected.type,
      error: { message: 'Ошибка регистрации' }
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
  });

  it('обрабатывает loginUserThunk.pending', () => {
    const state = userReducer(initialState, { type: loginUserThunk.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает loginUserThunk.fulfilled', () => {
    const state = userReducer(initialState, {
      type: loginUserThunk.fulfilled.type,
      payload: userMock
    });

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  it('обрабатывает loginUserThunk.rejected', () => {
    const state = userReducer(initialState, {
      type: loginUserThunk.rejected.type,
      error: { message: 'Ошибка авторизации' }
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка авторизации');
  });

  it('обрабатывает getUserThunk.pending', () => {
    const state = userReducer(initialState, { type: getUserThunk.pending.type });
    expect(state.isLoading).toBe(true);
  });

  it('обрабатывает getUserThunk.fulfilled', () => {
    const state = userReducer(initialState, {
      type: getUserThunk.fulfilled.type,
      payload: userMock
    });

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  it('обрабатывает getUserThunk.rejected', () => {
    const state = userReducer(initialState, { type: getUserThunk.rejected.type });
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

   it('обрабатывает updateUserThunk.pending', () => {
    const state = userReducer(initialState, { type: updateUserThunk.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает updateUserThunk.fulfilled', () => {
    const state = userReducer(initialState, {
      type: updateUserThunk.fulfilled.type,
      payload: updateUserResponseMock.user
    });

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(updateUserResponseMock.user);
  });

  it('обрабатывает updateUserThunk.rejected', () => {
    const state = userReducer(initialState, {
      type: updateUserThunk.rejected.type,
      error: { message: 'Ошибка обновления профиля' }
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка обновления профиля');
  });

  it('обрабатывает logoutUserThunk.fulfilled', () => {
    const stateWithUser = { ...initialState, user: userMock };
    const state = userReducer(stateWithUser, { type: logoutUserThunk.fulfilled.type });
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
