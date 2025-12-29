import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

import { Routes, Route, useLocation } from 'react-router-dom';
import { Modal } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />

    <Routes>
      <Route path='/' element={<ConstructorPage />} />
    </Routes>
  </div>
);

export default App;
