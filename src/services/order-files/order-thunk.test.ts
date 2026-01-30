import { fetchOrdersThunk, createOrderThunk, getOrderByNumberThunk } from './order-thunks';
import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { ordersMock, createOrderResponseMock, getOrderByNumberResponseMock } from './order-mock';

jest.mock('../../utils/burger-api');

describe('Тест - тханки для order', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  afterEach(() => jest.clearAllMocks());

  it('диспатчит pending для fetchOrdersThunk', async () => {
    (getOrdersApi as jest.Mock).mockResolvedValue(ordersMock);
    const thunk = fetchOrdersThunk();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchOrdersThunk.pending.type }));
  });

  it('диспатчит fulfilled для fetchOrdersThunk', async () => {
    (getOrdersApi as jest.Mock).mockResolvedValue(ordersMock);
    const thunk = fetchOrdersThunk();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchOrdersThunk.fulfilled.type, payload: ordersMock }));
  });

  it('диспатчит rejected для fetchOrdersThunk', async () => {
    (getOrdersApi as jest.Mock).mockRejectedValue(new Error('Ошибка API'));
    const thunk = fetchOrdersThunk();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchOrdersThunk.rejected.type,
      error: expect.objectContaining({ message: 'Ошибка API' })
    }));
  });

  it('диспатчит pending для createOrderThunk', async () => {
    (orderBurgerApi as jest.Mock).mockResolvedValue(createOrderResponseMock);
    const thunk = createOrderThunk(['bun1', 'main1']);
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: createOrderThunk.pending.type }));
  });

  it('диспатчит fulfilled для createOrderThunk', async () => {
    (orderBurgerApi as jest.Mock).mockResolvedValue(createOrderResponseMock);
    const thunk = createOrderThunk(['bun1', 'main1']);
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: createOrderThunk.fulfilled.type, payload: createOrderResponseMock }));
  });

  it('диспатчит rejected для createOrderThunk', async () => {
    (orderBurgerApi as jest.Mock).mockRejectedValue(new Error('Ошибка API'));
    const thunk = createOrderThunk(['bun1', 'main1']);
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: createOrderThunk.rejected.type,
      error: expect.objectContaining({ message: 'Ошибка API' })
    }));
  });

  it('диспатчит pending для getOrderByNumberThunk', async () => {
    (getOrderByNumberApi as jest.Mock).mockResolvedValue(getOrderByNumberResponseMock);
    const thunk = getOrderByNumberThunk(201);
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getOrderByNumberThunk.pending.type }));
  });

  it('диспатчит fulfilled для getOrderByNumberThunk', async () => {
    (getOrderByNumberApi as jest.Mock).mockResolvedValue(getOrderByNumberResponseMock);
    const thunk = getOrderByNumberThunk(201);
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: getOrderByNumberThunk.fulfilled.type, payload: getOrderByNumberResponseMock.orders }));
  });

  it('диспатчит rejected для getOrderByNumberThunk', async () => {
    (getOrderByNumberApi as jest.Mock).mockRejectedValue(new Error('Ошибка API'));
    const thunk = getOrderByNumberThunk(201);
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: getOrderByNumberThunk.rejected.type,
      error: expect.objectContaining({ message: 'Ошибка API' })
    }));
  });
});
