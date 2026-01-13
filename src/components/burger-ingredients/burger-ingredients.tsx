import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

import { useSelector } from '../../services/store'; // <-- импорт useSelector
import {
  selectBuns,
  selectMains,
  selectSauces,
  selectIngredientsLoading,
  selectIngredientsError
} from '../../services/burger-ingredient-files/burger-ingredient-selectors';
import { useDispatch } from '../../services/store';
import { fetchIngredientThunk } from '../../services/burger-ingredient-files/burger-ingredient-thunk';
import { TIngredient } from '@utils-types';
import { addIngredient } from '../../services/burger-constructor-slice';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */

  //const dispatch = useDispatch();

  const buns = useSelector(selectBuns);
  const mains = useSelector(selectMains);
  const sauces = useSelector(selectSauces);

  const ingredients = useSelector((state) => state.ingredients.ingredients);

  console.log('buns', buns);
  console.log('mains', mains);
  console.log('sauces', sauces);
  console.log('ALL ingredients', ingredients);

  const isLoading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // const handleAddIngredient = (ingredient: TIngredient) => {
  //  dispatch(addIngredient(ingredient));
  // };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
      //onAddIngredient={handleAddIngredient}
    />
  );
};
