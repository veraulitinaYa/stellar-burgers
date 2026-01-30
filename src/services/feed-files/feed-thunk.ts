import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

type TFeedPayload = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const fetchFeedThunk = createAsyncThunk('feed/fetchFeed', async () => {
  const feed = await getFeedsApi();
  console.log(feed);
  return feed;
});

export const getFeedOrderByNumberThunk = createAsyncThunk<TOrder[], number>(
  'feed/getOrderByNumber',
  async (orderNumber) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders;
  }
);
