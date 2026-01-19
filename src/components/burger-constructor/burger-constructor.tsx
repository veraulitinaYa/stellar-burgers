import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { selectIsOrderRequestSending } from '../../services/order-files/order-selectors';
import { selectCurrentOrder } from '../../services/order-files/order-selectors';
import { createOrderThunk } from '../../services/order-files/order-thunks';
import { resetModalForNewOrder } from '../../services/order-files/order-slice';
import { clearConstructor } from '../../services/burger-constructor-files/burger-constructor-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  //const constructorItems = {
  //   bun: {
  //price: 0
  //  },
  //  ingredients: []
  // };

  const { bun, ingredients } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const orderRequest = useSelector(selectIsOrderRequestSending);

  const orderModalData = useSelector(selectCurrentOrder);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const newOrder = [bun._id, ...ingredients.map((item) => item._id), bun._id];

    dispatch(createOrderThunk(newOrder));
    console.log('Заказ отправлен');
  };

  const closeOrderModal = () => {
    dispatch(resetModalForNewOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (bun?.price || 0) * 2 +
      (Array.isArray(ingredients)
        ? ingredients.reduce(
            (s: number, v: TConstructorIngredient) => s + (v.price || 0),
            0
          )
        : 0),
    [bun, ingredients]
  );

  //  const handleAddIngredient = (ingredient: TConstructorIngredient) => {
  //    dispatch(addIngredient(ingredient)); // NEW
  //  };

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
