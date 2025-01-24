import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChat } from '../../api/chats';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import { useAppSelector } from '../../hooks';
import { ButtonBase } from '../../UI/buttons/Button';
import { InputBase } from '../../UI/Inputs/Input';
import './createchannelpage.scss';

const JoinChannelPage = () => {
  const navigate = useNavigate();
  const { id } = useAppSelector(state => state.user);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createChat(name, id); // Переходим на `await`, чтобы дождаться завершения
      setError(''); // Сбрасываем ошибку только в случае успеха
      navigate('/chats');
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      else setError('Неизвестная ошибка');
    }
  };

  const inputs: InputBase[] = [
    {
      label: 'Название канала',
      id: 'invite',
      name: 'invite',
      value: name,
      type: 'text',
      change: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setName(e.target.value),
      placeholder: 'Введите название',
      required: true,
    },
  ];

  const buttons: ButtonBase[] = [
    {
      click: () => {}, // Здесь вы вызываете функцию, которая отправляет форму
      text: 'Создать канал',
      type: 'submit',
    },
    {
      click: () => {
        navigate('/join-channel');
      },
      text: 'Хотите присоединиться?',
      type: 'button',
      secondary: true,
    },
  ];

  return (
    <main className="create-chanel">
      <h2 className="create-chanel__title">Создать канал</h2>
      <div className="create-chanel__container">
        <FormTemplate handleSubmit={handleAuth} inputs={inputs} buttons={buttons} />
        {error && <div className="error-message">{error}</div>}
      </div>
    </main>
  );
};

export default JoinChannelPage;
