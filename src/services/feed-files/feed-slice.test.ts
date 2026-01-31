import { feedReducer, initialState } from './feed-slice';
import { fetchFeedThunk, getFeedOrderByNumberThunk } from './feed-thunk';
import { feedApiResponseMock, feedOrdersMock } from './feed-mock';

describe('Тест - редюсер feed', () => {
  it('should return initial state', () => {
    const state = feedReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('обрабатывает fetchFeedThunk.pending', () => {
    const state = feedReducer(initialState, {
      type: fetchFeedThunk.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fetchFeedThunk.fulfilled', () => {
    const state = feedReducer(initialState, {
      type: fetchFeedThunk.fulfilled.type,
      payload: feedApiResponseMock
    });

    expect(state.isLoading).toBe(false);
    expect(state.isFetched).toBe(true);
    expect(state.orders).toEqual(feedOrdersMock);
    expect(state.total).toBe(feedApiResponseMock.total);
    expect(state.totalToday).toBe(feedApiResponseMock.totalToday);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fetchFeedThunk.rejected', () => {
    const state = feedReducer(initialState, {
      type: fetchFeedThunk.rejected.type,
      error: { message: 'Ошибка загрузки' }
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });

  it('обрабатывает getFeedOrderByNumberThunk.pending', () => {
    const state = feedReducer(initialState, {
      type: getFeedOrderByNumberThunk.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает getFeedOrderByNumberThunk.fulfilled', () => {
    const state = feedReducer(initialState, {
      type: getFeedOrderByNumberThunk.fulfilled.type,
      payload: [feedOrdersMock[0]]
    });

    expect(state.isLoading).toBe(false);
    expect(state.selectedOrderInFeed).toEqual(feedOrdersMock[0]);
  });

  it('обрабатывает getFeedOrderByNumberThunk.rejected', () => {
    const state = feedReducer(initialState, {
      type: getFeedOrderByNumberThunk.rejected.type,
      error: { message: 'Ошибка API' }
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка API');
  });
});
