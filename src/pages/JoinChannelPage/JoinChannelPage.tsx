import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinChat } from '../../api/chats';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import { useAppSelector } from '../../hooks';
import { ButtonBase } from '../../UI/buttons/Button';
import { InputBase } from '../../UI/Inputs/Input';
import './joinchannelpage.scss';

const JoinChannelPage = () => {
  const navigate = useNavigate();
  const { id } = useAppSelector(state => state.user);
  const [invite, setInvite] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await joinChat(invite, id);
      setError('');
      navigate('/chats');
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      else setError('Неизвестная ошибка');
    }
  };

  const inputs: InputBase[] = [
    {
      label: 'Код канала',
      id: 'invite',
      name: 'invite',
      value: invite,
      type: 'text',
      change: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setInvite(e.target.value),
      placeholder: 'Введите код канала',
      required: true,
    },
  ];

  const buttons: ButtonBase[] = [
    {
      click: () => {},
      text: 'Присоединиться',
      type: 'submit',
    },
    {
      click: () => {
        navigate('/create-channel');
      },
      text: 'Хотите создать канал?',
      type: 'button',
      secondary: true,
    },
  ];

  return (
    <main className="create-chanel">
      <h2 className="create-chanel__title">{error ? error : 'Добавить канал'}</h2>
      <div className="create-chanel__container">
        <FormTemplate handleSubmit={handleAuth} inputs={inputs} buttons={buttons} />
        {error && <div className="error-message">{error}</div>}
      </div>
    </main>
  );
};

export default JoinChannelPage;
