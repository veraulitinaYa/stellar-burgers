import { createSlice } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '../slice-names';
import { TOrder } from '@utils-types';
import { fetchFeedThunk, getFeedOrderByNumberThunk } from './feed-thunk';

export interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  selectedOrderInFeed: TOrder | null;
  isLoading: boolean;
  isFetched: boolean;
  error: string | null;
}

export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  selectedOrderInFeed: null,
  isLoading: false,
  isFetched: false,
  error: null
};

const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetched = true;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(fetchFeedThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      })
      .addCase(getFeedOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOrderInFeed = action.payload[0] ?? null;
      })
      .addCase(getFeedOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  }
});

export const feedReducer = feedSlice.reducer;
