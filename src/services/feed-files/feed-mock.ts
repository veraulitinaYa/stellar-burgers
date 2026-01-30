import { TOrder } from '@utils-types';

export const feedOrdersMock: TOrder[] = [
  {
    _id: 'order1',
    ingredients: ['bun1', 'main1'],
    status: 'done',
    name: 'Бургер 1',
    number: 101,
    createdAt: '2026-01-30T10:00:00.000Z',
    updatedAt: '2026-01-30T10:10:00.000Z'
  },
  {
    _id: 'order2',
    ingredients: ['bun2', 'main2'],
    status: 'pending',
    name: 'Бургер 2',
    number: 102,
    createdAt: '2026-01-30T11:00:00.000Z',
    updatedAt: '2026-01-30T11:10:00.000Z'
  }
];

export const feedApiResponseMock = {
  orders: feedOrdersMock,
  total: 200,
  totalToday: 5
};
