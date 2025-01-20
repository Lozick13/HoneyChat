import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputBase } from '../../UI/Inputs/Input';
import { ButtonBase } from '../../UI/buttons/Button';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import LogoLoader from '../../components/LogoLoader/LogoLoader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userRequest } from '../../redux/slices/userSlice';
import './signuppage.scss';

const SignUpPage = () => {
  // hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userLoading, userError, id } = useAppSelector(state => state.user);

  // states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // registration, reset states
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(userRequest({ name, email, password, method: 'register' }));
  };

  //redirect after successful registration
  useEffect(() => {
    if (id) {
      setEmail('');
      setPassword('');
      navigate('/chats');
    }
  }, [id, navigate]);

  const inputs: InputBase[] = [
    {
      label: 'Имя',
      id: 'name',
      name: 'name',
      value: name,
      type: 'text',
      change: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setName(e.target.value),
      placeholder: 'Ваше Имя',
      required: true,
    },
    {
      label: 'Почта',
      id: 'email',
      name: 'email',
      value: email,
      type: 'email',
      change: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setEmail(e.target.value),
      placeholder: 'Ваш Email',
      required: true,
    },
    {
      label: 'Пароль',
      id: 'password',
      name: 'password',
      value: password,
      type: 'password',
      change: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setPassword(e.target.value),
      min: 6,
      placeholder: 'Ваш пароль',
      required: true,
    },
  ];

  const buttons: ButtonBase[] = [
    // registration
    {
      click: () => {},
      text: 'Регистрация',
    },
    // entry
    {
      click: () => {
        navigate('/auth');
      },
      text: 'Уже есть аккаунт?',
      secondary: true,
    },
  ];

  return (
    <>
      <main className="signup">
        <div className="signup__header">
          <LogoLoader started={userLoading} />
          <h1 className="signup__title">{userError ? userError : 'Мы Вам рады!'}</h1>
        </div>

        <FormTemplate handleSubmit={handleSignUp} inputs={inputs} buttons={buttons} />
      </main>
    </>
  );
};

export default SignUpPage;
