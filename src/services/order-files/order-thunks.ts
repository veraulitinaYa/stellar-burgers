import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const fetchOrdersThunk = createAsyncThunk<TOrder[]>(
  'orders/fetchOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const createOrderThunk = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);

export const getOrderByNumberThunk = createAsyncThunk<TOrder[], number>(
  'orders/fetchOrderByNumber',
  async (orderNumber) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders;
  }
);
