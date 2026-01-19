import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type TFeedPayload = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const fetchFeedThunk = createAsyncThunk<TFeedPayload>(
  'feed/fetchFeed',
  async () => {
    const feed = await getFeedsApi();
    return feed;
  }
);

export const getFeedOrderByNumberThunk = createAsyncThunk<TOrder[], number>(
  'feed/getOrderByNumber',
  async (orderNumber) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders;
  }
);
