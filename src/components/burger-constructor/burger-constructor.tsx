import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { addIngredient } from '../../services/burger-constructor-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch(); // NEW

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  //const constructorItems = {
  //   bun: {
  //price: 0
  //  },
  //  ingredients: []
  // };

  // NEW: берём данные конструктора из Redux
  const { bun, ingredients } = useSelector(
    (state: RootState) => state.constructor
  );

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
  };
  const closeOrderModal = () => {};
  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  // NEW: пример функции добавления ингредиента (можно использовать в handleAdd пропс)
  const handleAddIngredient = (ingredient: TConstructorIngredient) => {
    dispatch(addIngredient(ingredient)); // NEW
  }; // NEW

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
