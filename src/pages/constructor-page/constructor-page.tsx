import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { selectIngredientsLoading } from '../../services/burger-ingredient-files/burger-ingredient-selectors';
import { selectIngredientsFetched } from '../../services/burger-ingredient-files/burger-ingredient-selectors';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredientThunk } from '../../services/burger-ingredient-files/burger-ingredient-thunk';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIngredientsLoading);
  const isFetched = useSelector(selectIngredientsFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchIngredientThunk());
    }
  }, [dispatch, isFetched]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
