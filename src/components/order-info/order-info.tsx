import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { getFeedOrderByNumberThunk } from '../../services/feed-files/feed-thunk';
import {
  selectFeedCurrentOrder,
  selectFeedIsLoading
} from '../../services/feed-files/feed-selectors';
import { selectIngredients } from '../../services/burger-ingredient-files/burger-ingredient-selectors';
import { useDispatch, useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { useEffect } from 'react';

export const OrderInfo: FC = () => {
   const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  // Заказ из feedSlice
  const orderData: TOrder | null = useSelector(selectFeedCurrentOrder);
  const isLoading = useSelector(selectFeedIsLoading);

  // Все ингредиенты
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  // Подгружаем заказ по номеру при монтировании
  useEffect(() => {
    if (number) {
      dispatch(getFeedOrderByNumberThunk(Number(number)));
    }
  }, [dispatch, number]);


  /* Готовим данные для отображения */
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
    
    
console.log('Тут мы получаем null и дальше не идем' + orderInfo);
   return <Preloader />;
   
  }

  return <OrderInfoUI orderInfo={orderInfo}/>;
};
