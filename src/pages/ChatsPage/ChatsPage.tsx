import { useEffect } from 'react';
import { socket } from '../../api/socketIo'; // Импортируем сокет для взаимодействия с сервером
import { getUserChats } from '../../api/user'; // API для получения чатов пользователя
import ChatsList from '../../components/ChatsList/ChatsList'; // Компонент для отображения списка чатов
import OpenChat from '../../components/OpenChat/OpenChat'; // Компонент для отображения открытого чата
import { useAppDispatch, useAppSelector } from '../../hooks'; // Кастомные хуки для работы с Redux
import { chatRequest, chatsRequest, setActiveChat } from '../../redux/slices/chatsSlice'; // Действия для обновления чатов
import './chatspage.scss'; // Стили для страницы чатов

const ChatsPage = () => {
  const dispatch = useAppDispatch(); // Получаем функцию dispatch для вызова действий Redux
  const user = useAppSelector(state => state.user); // Получаем информацию о пользователе из Redux
  const { chats, activeChat, chatsLoading, chatsError } = useAppSelector(
    state => state.chats,
  ); // Получаем данные чатов
  // Функция для получения чатов пользователя
  const getChats = async () => {
    if (!user.id) return; // Если нет user.id, выходим из функции
    const chats = (await getUserChats(user.id)) as string[]; // Получаем ID чатов пользователя
    dispatch(chatsRequest(chats)); // Запрашиваем чаты
  };

  // Получаем чаты пользователя при загрузке компонента
  useEffect(() => {
    getChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, dispatch]); // Зависимость от user.id и dispatch

  // Подписки на события сокета
  useEffect(() => {
    // Обновление информации о чате
    const handleChatUpdate = (id: string) => {
      dispatch(chatRequest(id));
      // Запрашиваем обновленную информацию о чате
    };
    socket.on('chat:update', handleChatUpdate);

    // Удаление пользователя из чата
    const handleDeleteUserSuccess = (userId: string) => {
      if (userId === user.id) {
        dispatch(setActiveChat(undefined));
        socket.emit('chat:leaveChat', userId); // Если пользователь удален, выходим из чата
        getChats();
      }
      // Обновляем список чатов
      // Обновляем состояние пользователя, если это необходимо
    };
    socket.on('chat:deleteUserSuccess', handleDeleteUserSuccess);

    // Очистка обработчиков при размонтировании компонента
    return () => {
      socket.off('chat:update', handleChatUpdate);
      socket.off('chat:deleteUserSuccess', handleDeleteUserSuccess);
    };
  }, [socket, dispatch, user]); // Зависимости для событий сокета

  return (
    <main className="chats">
      <ChatsList
        loading={chatsLoading} // Состояние загрузки
        error={chatsError} // Ошибка, если она есть
        chats={chats} // Список чатов
        activeChat={activeChat} // Активный чат
      />
      <OpenChat /> {/* Открытый чат для общения */}
    </main>
  );
};

export default ChatsPage; // Экспортируем компонент
