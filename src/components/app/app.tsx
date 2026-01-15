import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails } from '@components';

import { Routes, Route, useLocation } from 'react-router-dom';
import { Modal } from '@components';
import { useNavigate } from 'react-router-dom';
import { OrderInfo } from '@components';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
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
              //<ProtectedRoute
              // component={
              <Modal title={''} onClose={handleClose}>
                <OrderInfo />
              </Modal>
              // }
              ///>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal title={''} onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
