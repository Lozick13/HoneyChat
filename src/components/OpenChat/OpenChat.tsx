import { useEffect, useState } from 'react';
import { Chat, getChatById, sendMessageById } from '../../api/chats';
import { icons } from '../../api/icons';
import { socket } from '../../api/socketIo';
import { useAppSelector } from '../../hooks';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import ChatInput from '../../UI/Inputs/ChatInput/ChatInput';
import ChatInfo from '../ChatInfo/ChatInfo';
import ChatMessage from '../ChatMessage/ChatMessage';
import LogoLoader from '../LogoLoader/LogoLoader';
import './openchat.scss';

const OpenChat = () => {
  const { id } = useAppSelector(state => state.user);
  const { activeChat } = useAppSelector(state => state.chats);
  const [input, setInput] = useState<string>('');
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [chatInfoVisible, setChatInfoVisible] = useState<boolean>(false);

  // send message
  const sendMessage = async () => {
    if (!input.trim() || !activeChat) return;

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
      setInput('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
    }
  };

  // getting chat
  const getChat = async (id: string) => {
    setChat(null);
    setLoading(true);
    setErrorMessage(null);
    try {
      const data: Chat = (await getChatById(id)) as Chat;
      setChat(data);
    } catch (error) {
      console.error(error);
      setErrorMessage('Ошибка при загрузке чата. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  // chat update
  useEffect(() => {
    const handleChatUpdate = (id: string) => {
      getChat(id);
    };
    socket.on('chat:update', handleChatUpdate);
  }, []);

  // scroll to bottom
  useEffect(() => {
    const chatBody = document.querySelector('.open-chat__body');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [chat]);

  // get chat on active chat
  useEffect(() => {
    if (activeChat) {
      getChat(activeChat);
    }
  }, [activeChat]);

  return (
    <section className="open-chat">
      {activeChat && (
        <>
          <div className="open-chat__info-button">
            <IconButton icon="info" click={() => setChatInfoVisible(!chatInfoVisible)} />
          </div>
          {chatInfoVisible && chat && (
            <div className="open-chat__info">
              <ChatInfo
                setVisible={(value: boolean) => setChatInfoVisible(value)}
                chat={chat}
              />
            </div>
          )}

          <h2 className="open-chat__title">{chat?.title}</h2>
          {loading && <LogoLoader started />}
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
