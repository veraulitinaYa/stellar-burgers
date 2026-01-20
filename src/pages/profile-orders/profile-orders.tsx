import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrdersThunk} from '../../services/order-files/order-thunks';
import { selectOrders } from '../../services/order-files/order-selectors';
import { useEffect } from 'react';

export const ProfileOrders: FC = () => {

  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
