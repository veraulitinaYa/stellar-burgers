import {
  orderReducer,
  initialState,
  resetModalForNewOrder
} from './order-slice';
import {
  fetchOrdersThunk,
  createOrderThunk,
  getOrderByNumberThunk
} from './order-thunks';
import {
  ordersMock,
  createOrderResponseMock,
  getOrderByNumberResponseMock
} from './order-mock';

describe('Тест - редюсер order', () => {
  it('should return initial state', () => {
    const state = orderReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('обрабатывает  createOrderThunk.pending', () => {
    const state = orderReducer(initialState, {
      type: createOrderThunk.pending.type
    });
    expect(state.isOrderRequestSending).toBe(true);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает createOrderThunk.fulfilled', () => {
    const state = orderReducer(initialState, {
      type: createOrderThunk.fulfilled.type,
      payload: createOrderResponseMock
    });

    expect(state.isOrderRequestSending).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.currentOrderToShowinModal).toEqual(
      createOrderResponseMock.order
    );
  });

  it('обрабатывает createOrderThunk.rejected', () => {
    const state = orderReducer(initialState, {
      type: createOrderThunk.rejected.type,
      error: { message: 'Ошибка API' }
    });

    expect(state.isOrderRequestSending).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка API');
  });

  it('обрабатывает fetchOrdersThunk.pending', () => {
    const state = orderReducer(initialState, {
      type: fetchOrdersThunk.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fetchOrdersThunk.fulfilled', () => {
    const state = orderReducer(initialState, {
      type: fetchOrdersThunk.fulfilled.type,
      payload: ordersMock
    });

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(ordersMock);
  });

  it('обрабатывает fetchOrdersThunk.rejected', () => {
    const state = orderReducer(initialState, {
      type: fetchOrdersThunk.rejected.type,
      error: { message: 'Ошибка загрузки' }
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });

  it('обрабатывает getOrderByNumberThunk.pending', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumberThunk.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает getOrderByNumberThunk.fulfilled', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: getOrderByNumberResponseMock.orders
    });

    expect(state.isLoading).toBe(false);
    expect(state.currentOrderToShowinModal).toEqual(
      getOrderByNumberResponseMock.orders[0]
    );
  });

  it('обрабатывает getOrderByNumberThunk.rejected', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumberThunk.rejected.type,
      error: { message: 'Ошибка API' }
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка API');
  });

  it('сбрасывает модалку для нового заказа', () => {
    const stateWithOrder = {
      ...initialState,
      currentOrderToShowinModal: ordersMock[0]
    };
    const state = orderReducer(stateWithOrder, resetModalForNewOrder());
    expect(state.currentOrderToShowinModal).toBeNull();
  });
});
