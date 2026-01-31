import { TOrder } from '@utils-types';

export const ordersMock: TOrder[] = [
  {
    _id: 'order1',
    ingredients: ['bun1', 'main1'],
    status: 'done',
    name: 'Бургер 1',
    number: 201,
    createdAt: '2026-01-30T12:00:00.000Z',
    updatedAt: '2026-01-30T12:10:00.000Z'
  },
  {
    _id: 'order2',
    ingredients: ['bun2', 'main2'],
    status: 'pending',
    name: 'Бургер 2',
    number: 202,
    createdAt: '2026-01-30T13:00:00.000Z',
    updatedAt: '2026-01-30T13:10:00.000Z'
  }
];

export const createOrderResponseMock = {
  order: ordersMock[0]
};

export const getOrderByNumberResponseMock = {
  orders: [ordersMock[0]]
};
