import { RootState } from '../store';
import { TOrder } from '@utils-types';
import { FeedState } from './feed-slice';

export const selectFeedState = (state: RootState): FeedState => state.feed;

export const selectFeedOrders = (state: RootState): TOrder[] =>
  state.feed.orders;

export const selectFeedTotal = (state: RootState): number => state.feed.total;

export const selectFeedTotalToday = (state: RootState): number =>
  state.feed.totalToday;

export const selectFeedCurrentOrder = (state: RootState): TOrder | null =>
  state.feed.selectedOrderInFeed;

export const selectFeedIsLoading = (state: RootState): boolean =>
  state.feed.isLoading;

export const selectFeedIsFetched = (state: RootState): boolean =>
  state.feed.isFetched;

export const selectFeedError = (state: RootState): string | null =>
  state.feed.error;
