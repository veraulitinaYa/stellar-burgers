import { fetchFeedThunk, getFeedOrderByNumberThunk } from './feed-thunk';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { feedApiResponseMock, feedOrdersMock } from './feed-mock';

jest.mock('../../utils/burger-api');

describe('Тест - тханки для feed', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  afterEach(() => jest.clearAllMocks());

  it('диспатчит pending для fetchFeedThunk', async () => {
    (getFeedsApi as jest.Mock).mockResolvedValue(feedApiResponseMock);

    const thunk = fetchFeedThunk();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchFeedThunk.pending.type })
    );
  });

  it('диспатчит fulfilled для fetchFeedThunk', async () => {
    (getFeedsApi as jest.Mock).mockResolvedValue(feedApiResponseMock);

    const thunk = fetchFeedThunk();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchFeedThunk.fulfilled.type, payload: feedApiResponseMock })
    );
  });

  it('should dispatch rejected for fetchFeedThunk', async () => {
    (getFeedsApi as jest.Mock).mockRejectedValue(new Error('Ошибка API'));

    const thunk = fetchFeedThunk();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchFeedThunk.rejected.type, error: expect.objectContaining({ message: 'Ошибка API' }) })
    );
  });

 it('диспатчит pending для getFeedOrderByNumberThunk', async () => {
    (getOrderByNumberApi as jest.Mock).mockResolvedValue({ orders: [feedOrdersMock[0]] });

    const thunk = getFeedOrderByNumberThunk(101);
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: getFeedOrderByNumberThunk.pending.type })
    );
  });

    it('диспатчит fulfilled для getFeedOrderByNumberThunk', async () => {
    (getOrderByNumberApi as jest.Mock).mockResolvedValue({ orders: [feedOrdersMock[0]] });

    const thunk = getFeedOrderByNumberThunk(101);
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: getFeedOrderByNumberThunk.fulfilled.type, payload: [feedOrdersMock[0]] })
    );
  });

  it('диспатчит rejected для getFeedOrderByNumberThunk', async () => {
    (getOrderByNumberApi as jest.Mock).mockRejectedValue(new Error('Ошибка API'));

    const thunk = getFeedOrderByNumberThunk(101);
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: getFeedOrderByNumberThunk.rejected.type,
        error: expect.objectContaining({ message: 'Ошибка API' })
      })
    );
  });
});
