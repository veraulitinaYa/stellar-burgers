import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/user-files/user-selectors';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  console.log('Получили юзера' + user + JSON);
  return <AppHeaderUI userName={user?.name} />;
};
