import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userRequest } from '../../redux/slices/userSlice';
import { ButtonBase } from '../../UI/buttons/Button';
import { Input } from '../../UI/Inputs/Input';
import './authpage.scss';

const AuthPage = () => {
  // hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userLoading, userError, auth } = useAppSelector(state => state.user);

  // states
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // authentication, reset states
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(userRequest({ email, password, method: 'login' }));
  };

  // redirect after successful login
  useEffect(() => {
    if (auth) {
      setEmail('');
      setPassword('');
      navigate('/chats');
    }
  }, [auth, navigate]);

  const inputs: Input[] = [
    {
      label: 'Почта',
      id: 'email',
      name: 'email',
      value: email,
      type: 'email',
      change: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      placeholder: 'Ваш Email',
      required: true,
    },
    {
      label: 'Пароль',
      id: 'password',
      name: 'password',
      value: password,
      type: 'password',
      change: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      min: 6,
      placeholder: 'Ваш пароль',
      required: true,
    },
  ];

  const buttons: ButtonBase[] = [
    // entry
    {
      click: () => {},
      text: 'Вход',
    },
    // registration
    {
      click: () => {
        navigate('/signup');
      },
      text: 'Ещё нет аккаунта?',
      secondary: true,
    },
  ];

  return (
    <>
      <main className="auth">
        <div className="auth__header">
          <LogoLoader started={userLoading} />
          <h1 className="auth__title">{userError ? userError : 'Добро Пожаловать!'}</h1>
        </div>

        <FormTemplate handleSubmit={handleAuth} inputs={inputs} buttons={buttons} />
      </main>
    </>
  );
};

export default AuthPage;
