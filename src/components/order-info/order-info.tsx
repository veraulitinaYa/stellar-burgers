import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  selectFeedCurrentOrder,
  selectFeedIsLoading
} from '../../services/feed-files/feed-selectors';
import { selectIngredients } from '../../services/burger-ingredient-files/burger-ingredient-selectors';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../services/store';
import { getFeedOrderByNumberThunk } from '../../services/feed-files/feed-thunk';
import { useEffect } from 'react';


export const OrderInfo: FC = () => {
  const orderData = useSelector(selectFeedCurrentOrder);
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectFeedIsLoading);

  const { number } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (number) {
      dispatch(getFeedOrderByNumberThunk(Number(number)));
    }
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
  <>
    <OrderInfoUI orderInfo={orderInfo} />
  </>
);
}
