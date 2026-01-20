import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutUserThunk } from '../../services/user-files/user-thunks';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

   const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    console.log('Вышли');
    navigate('/login', { replace: true });
  };


  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
