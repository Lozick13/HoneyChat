import { useState } from 'react';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import ChatInput from '../../UI/Inputs/ChatInput/ChatInput';
import ChatMessage from '../ChatPreview/ChatPreviw';
import './chatslist.scss';

const ChatsList = () => {
  const [searchData, setSearchData] = useState<string>('');

  return (
    <section className="chats-list">
      <div className="chats-list__header">
        <h2 className="chats-list__title">Чаты</h2>
        <IconButton icon="add_circle" click={() => {}} />
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
        {Array.from({ length: 20 }).map((_, idx) => (
          <ChatMessage
            key={idx}
            click={() => {}}
            avatar="./assets/honey-icon.png"
            user={`User ${idx + 1}`}
            message="Hello!"
          />
        ))}
      </div>
    </section>
  );
};

export default ChatsList;
