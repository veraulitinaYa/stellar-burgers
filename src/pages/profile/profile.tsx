import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUser, selectUserError } from '../../services/user-files/user-selectors';
import { updateUserThunk } from '../../services/user-files/user-thunks';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  // const user = {
  //   name: '',
  //   email: ''
  // };
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const updateUserError = useSelector(selectUserError);


  // const [formValue, setFormValue] = useState({
  //   name: user.name,
  //   email: user.email,
  //   password: ''
  // });
    const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  // const handleSubmit = (e: SyntheticEvent) => {
  //   e.preventDefault();
  // };

const handleSubmit = (e: SyntheticEvent) => {
  e.preventDefault();

  dispatch(
    updateUserThunk({
      name: formValue.name,
      email: formValue.email,
      ...(formValue.password && { password: formValue.password })
    })
  );
};

const handleCancel = (e: SyntheticEvent) => {
  e.preventDefault();
  if (!user) return;

  setFormValue({
    name: user.name,
    email: user.email,
    password: ''
  });
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      // updateUserError={updateUserError}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  //return null;
};
