import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import {
  fetchFeedThunk,
  getFeedOrderByNumberThunk
} from '../../services/feed-files/feed-thunk';
import {
  selectFeedOrders,
  selectFeedIsLoading,
  selectFeedCurrentOrder
} from '../../services/feed-files/feed-selectors';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedIsLoading);
  const currentOrder = useSelector(selectFeedCurrentOrder);

  // при монтировании — подгружаем feed
  useEffect(() => {
    dispatch(fetchFeedThunk());
  }, [dispatch]);

  // функция для получения конкретного заказа
  const handleGetOrderByNumber = (orderNumber: number) => {
    dispatch(getFeedOrderByNumberThunk(orderNumber));
  };

  // if (isLoading) {
  //   return <Preloader />;
  // }

  return (
    <FeedUI
      orders={orders}
      //currentOrder={currentOrder}
      handleGetFeeds={() => dispatch(fetchFeedThunk())}
      //handleGetOrderByNumber={handleGetOrderByNumber}
    />
  );
};
