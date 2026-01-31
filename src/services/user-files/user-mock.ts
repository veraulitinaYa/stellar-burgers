import { TUser } from '@utils-types';

export const userMock: TUser = {
  email: 'test@example.com',
  name: 'Тестовый пользователь'
};

export const registerResponseMock = {
  user: userMock,
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken'
};

export const loginResponseMock = {
  user: userMock,
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken'
};

export const updateUserResponseMock = {
  user: { ...userMock, name: 'Обновлённый пользователь' }
};

export const getUserResponseMock = {
  user: userMock
};
