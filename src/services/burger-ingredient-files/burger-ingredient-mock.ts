import { TIngredient } from '@utils-types';

export const ingredientsMock: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  {
    _id: '2',
    name: 'Соус',
    type: 'sauce',
    proteins: 1,
    fat: 2,
    carbohydrates: 5,
    calories: 30,
    price: 20,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  {
    _id: '3',
    name: 'Котлета',
    type: 'main',
    proteins: 20,
    fat: 15,
    carbohydrates: 5,
    calories: 250,
    price: 80,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];
