import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi
} from '@api';
import { TRegisterData, TLoginData } from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const getUserThunk = createAsyncThunk<TUser>(
  'user/getUser',
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

export const updateUserThunk = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/updateUser',
  async (data) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  await logoutApi();
});

export const forgotPasswordThunk = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => {
    await forgotPasswordApi(data);
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => {
    await resetPasswordApi(data);
  }
);
