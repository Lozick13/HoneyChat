import { useEffect, useState } from 'react';
import { Chat, getChatById, sendMessageById } from '../../api/chats';
import { icons } from '../../api/icons';
import { socket } from '../../api/socketIo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import ChatInput from '../../UI/Inputs/ChatInput/ChatInput';
import ChatMessage from '../ChatMessage/ChatMessage';
import './openchat.scss';

const OpenChat = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(state => state.user);
  const { activeChat } = useAppSelector(state => state.chats);
  const [input, setInput] = useState<string>('');
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getChat = async (id: string) => {
    setChat(null);
    setLoading(true);
    setErrorMessage(null);
    try {
      const data: Chat = (await getChatById(id)) as Chat;
      setChat(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrorMessage('Ошибка при загрузке чата. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on('chat:update', id => {
      getChat(id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);

  useEffect(() => {
    if (!activeChat) return;

    getChat(activeChat);
  }, [activeChat]);

  useEffect(() => {
    const chatBody = document.querySelector('.open-chat__body');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [chat]);

  const sendMessage = async () => {
    if (input.trim() && activeChat) {
      try {
        await sendMessageById(activeChat, {
          chatId: activeChat,
          userId: id,
          text: input,
          time: new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
        });
        // Обновляем чат после успешной отправки сообщения
        await getChat(activeChat);
        setInput('');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setErrorMessage('Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
      }
    }
  };

  return (
    <section className="open-chat">
      {activeChat && (
        <>
          <h2 className="open-chat__title">{chat?.title}</h2>
          {loading && <p>Loading messages...</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="open-chat__body">
            {chat?.messages.map(message => (
              <ChatMessage
                key={message.id}
                avatar={icons[message.user.avatar]}
                user={message.user.name}
                message={message.text}
                time={message.time}
                owner={message.user.id === id}
              />
            ))}
          </div>
          <ChatInput
            rightElement={<IconButton icon="send" click={sendMessage} />}
            id="message"
            name="message"
            value={input}
            type="text"
            change={e => setInput(e.target.value)}
            placeholder="Напишите Ваше сообщение"
            required
            textarea
          />
        </>
      )}
    </section>
  );
};

export default OpenChat;
