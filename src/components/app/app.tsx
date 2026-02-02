import { ConstructorPage, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails } from '@components';

import { Routes, Route, useLocation } from 'react-router-dom';
import { Modal } from '@components';
import { useNavigate } from 'react-router-dom';
import { OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { Feed } from '@pages';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredientThunk } from '../../services/burger-ingredient-files/burger-ingredient-thunk';
import { getUserThunk } from '../../services/user-files/user-thunks';
import { OrderModal } from '../order-modal/order-modal';
import { useMatch } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();

  const feedMatch = useMatch('/feed/:number');
  const profileOrderMatch = useMatch('/profile/orders/:number');

  const orderNumber =
    feedMatch?.params.number || profileOrderMatch?.params.number;

  const formattedOrderNumber = orderNumber
    ? String(orderNumber).padStart(6, '0')
    : '';

  useEffect(() => {
    dispatch(fetchIngredientThunk());
    dispatch(getUserThunk());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.ingredientPage}>
              <p className='text text_type_main-large mb-5 text_align_center'>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />

        <Route
          path='/feed/:number'
          element={
            <div className={styles.orderPage}>
              <p className='text text_type_digits-default mb-10 '>
                #{formattedOrderNumber}
              </p>
              <OrderInfo />
            </div>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <div className={styles.orderPage}>
                <p className='text text_type_digits-default text_align_center mb-10'>
                  #{formattedOrderNumber}
                </p>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={`#${formattedOrderNumber}`} onClose={handleClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title={`#${formattedOrderNumber}`} onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

//PR12 first commit

export default App;
