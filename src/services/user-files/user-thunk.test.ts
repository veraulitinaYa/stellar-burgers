/**
 * @jest-environment jsdom
 */
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk
} from './user-thunks';
import {
  registerResponseMock,
  loginResponseMock,
  userMock,
  updateUserResponseMock,
  getUserResponseMock
} from './user-mock';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi
} from '../../utils/burger-api';

jest.mock('../../utils/burger-api');

describe('Тест - тханик для user', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  afterEach(() => jest.clearAllMocks());

  it('диспатчит pending для registerUserThunk', async () => {
    (registerUserApi as jest.Mock).mockResolvedValue(registerResponseMock);
    const thunk = registerUserThunk({ email: 'a', password: 'b', name: 'c' });
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: registerUserThunk.pending.type }));
  });

  it('диспатчит fulfilled для registerUserThunk', async () => {
    (registerUserApi as jest.Mock).mockResolvedValue(registerResponseMock);
    const thunk = registerUserThunk({ email: 'a', password: 'b', name: 'c' });
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: registerUserThunk.fulfilled.type,
      payload: userMock
    }));
  });

  it('диспатчит rejected для registerUserThunk', async () => {
    (registerUserApi as jest.Mock).mockRejectedValue(new Error('Ошибка регистрации'));
    const thunk = registerUserThunk({ email: 'a', password: 'b', name: 'c' });
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: registerUserThunk.rejected.type,
      error: expect.objectContaining({ message: 'Ошибка регистрации' })
    }));
  });

  it('диспатчит pending для loginUserThunk', async () => {
    (loginUserApi as jest.Mock).mockResolvedValue(loginResponseMock);
    const thunk = loginUserThunk({ email: 'a', password: 'b' });
    await thunk(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: loginUserThunk.pending.type }));
  });

  it('диспатчит fulfilled для loginUserThunk', async () => {
    (loginUserApi as jest.Mock).mockResolvedValue(loginResponseMock);
    const thunk = loginUserThunk({ email: 'a', password: 'b' });
    await thunk(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: loginUserThunk.fulfilled.type,
      payload: userMock
    }));
  });

  it('диспатчит rejected для loginUserThunk', async () => {
    (loginUserApi as jest.Mock).mockRejectedValue(new Error('Ошибка авторизации'));
    const thunk = loginUserThunk({ email: 'a', password: 'b' });
    await thunk(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: loginUserThunk.rejected.type,
      error: expect.objectContaining({ message: 'Ошибка авторизации' })
    }));
  });

  it('диспатчит pending для getUserThunk', async () => {
    (getUserApi as jest.Mock).mockResolvedValue(getUserResponseMock);
    const thunk = getUserThunk();
    await thunk(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getUserThunk.pending.type }));
  });

  it('диспатчит fulfilled для getUserThunk', async () => {
    (getUserApi as jest.Mock).mockResolvedValue(getUserResponseMock);
    const thunk = getUserThunk();
    await thunk(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: getUserThunk.fulfilled.type,
      payload: userMock
    }));
  });

  it('диспатчит rejected для getUserThunk', async () => {
    (getUserApi as jest.Mock).mockRejectedValue(new Error('Ошибка API'));
    const thunk = getUserThunk();
    await thunk(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: getUserThunk.rejected.type,
      error: expect.objectContaining({ message: 'Ошибка API' })
    }));
  });

  it('диспатчит pending для updateUserThunk', async () => {
    (updateUserApi as jest.Mock).mockResolvedValue(updateUserResponseMock);
    const thunk = updateUserThunk({ name: 'Обновлённый' });
    await thunk(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: updateUserThunk.pending.type }));
  });

  it('диспатчит fulfilled для updateUserThunk', async () => {
    (updateUserApi as jest.Mock).mockResolvedValue(updateUserResponseMock);
    const thunk = updateUserThunk({ name: 'Обновлённый' });
    await thunk(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: updateUserThunk.fulfilled.type,
      payload: updateUserResponseMock.user
    }));
  });

  it('диспатчит rejected для updateUserThunk', async () => {
    (updateUserApi as jest.Mock).mockRejectedValue(new Error('Ошибка обновления профиля'));
    const thunk = updateUserThunk({ name: 'Обновлённый' });
    await thunk(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: updateUserThunk.rejected.type,
      error: expect.objectContaining({ message: 'Ошибка обновления профиля' })
    }));
  });

  it('диспатчит fulfilled для logoutUserThunk', async () => {
    (logoutApi as jest.Mock).mockResolvedValue(undefined);
    const thunk = logoutUserThunk();
    await thunk(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: logoutUserThunk.fulfilled.type }));
  });
});
