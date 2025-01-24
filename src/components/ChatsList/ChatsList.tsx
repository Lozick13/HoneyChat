import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatPreview as Chat } from '../../api/chats';
import { useAppDispatch } from '../../hooks';
import { setActiveChat } from '../../redux/slices/chatsSlice';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import ChatInput from '../../UI/Inputs/ChatInput/ChatInput';
import ChatPreview from '../ChatPreview/ChatPreview';
import LogoLoader from '../LogoLoader/LogoLoader';
import './chatslist.scss';

interface ChatsListProps {
  loading: boolean;
  error?: string;
  chats: Chat[];
  activeChat?: string;
}

const ChatsList = ({ loading, error, chats, activeChat }: ChatsListProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchData, setSearchData] = useState<string>('');

  // setting up an active chat
  const handleChatClick = (chatId: string) => {
    dispatch(setActiveChat(chatId));
  };

  return (
    <section className="chats-list">
      <div className="chats-list__header">
        <h2 className="chats-list__title">Чаты</h2>
        <IconButton icon="add_circle" click={() => navigate('/join-channel')} />
      </div>

      <ChatInput
        leftElement={
          <label htmlFor="search-chat">
            <span className="material-symbols-outlined">search</span>
          </label>
        }
        id="search-chat"
        name="search-chat"
        value={searchData}
        type="text"
        change={e => setSearchData(e.target.value)}
        placeholder="Найти пользователя"
        required
      />

      <div className="chats-list__body">
        {loading && <LogoLoader started />}
        {error && <p className="error">{error}</p>}

        {!loading && chats.length > 0
          ? chats.map(chat => (
              <ChatPreview
                key={chat.id}
                click={() => handleChatClick(chat.id)}
                avatar="./assets/honey-icon.png"
                title={chat.title}
                message={chat.message}
                active={chat.id === activeChat}
              />
            ))
          : !loading && <p>Чатов нет</p>}
      </div>
    </section>
  );
};

export default ChatsList;
