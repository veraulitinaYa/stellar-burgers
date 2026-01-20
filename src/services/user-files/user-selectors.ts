import { RootState } from '../store';
import { TUser } from '@utils-types';

// базовый селектор всего user state
export const selectUserState = (state: RootState) => state.user;

// текущий пользователь
export const selectUser = (state: RootState): TUser | null => state.user.user;

// флаг: проверена ли авторизация
export const selectIsAuthChecked = (state: RootState): boolean =>
  state.user.isAuthChecked;

// загрузка (логин, регистрация, обновление профиля и т.д.)
export const selectUserIsLoading = (state: RootState): boolean =>
  state.user.isLoading;

// ошибка user-слайса
export const selectUserError = (state: RootState): string | null =>
  state.user.error;
