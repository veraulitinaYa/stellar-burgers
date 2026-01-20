import { createSlice } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../slice-names';
import { TUser } from '@utils-types';
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk
} from './user-thunks';

export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = null;
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления профиля';
      })

      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })

      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});

export const userReducer = userSlice.reducer;
