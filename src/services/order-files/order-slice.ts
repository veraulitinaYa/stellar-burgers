import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrdersThunk } from './order-thunks';
import { createOrderThunk } from './order-thunks';
import { getOrderByNumberThunk } from './order-thunks';
import { ORDER_SLICE_NAME } from '../slice-names';

export interface OrderState {
  orders: TOrder[];
  currentOrderToShowinModal: TOrder | null;
  orderRequestSending: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrderToShowinModal: null,
  orderRequestSending: false,
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    resetModalForNewOrder(state) {
      state.currentOrderToShowinModal = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequestSending = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.orderRequestSending = false;
        state.isLoading = false;
        state.currentOrderToShowinModal = action.payload.order;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.orderRequestSending = false;
        state.isLoading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      })
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      })

      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrderToShowinModal = action.payload[0] ?? null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  }
});

export const { resetModalForNewOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
