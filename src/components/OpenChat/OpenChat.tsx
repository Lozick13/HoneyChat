import { useState } from 'react';
import IconButton from '../../UI/buttons/IconButton/IconButton';
import ChatInput from '../../UI/Inputs/ChatInput/ChatInput';
import ChatMessage from '../ChatMessage/ChatMessage';
import './openchat.scss';

const OpenChat = () => {
  const [message, setMessage] = useState<string>('');

  return (
    <section className="open-chat">
      <h2 className="open-chat__title">Name</h2>

      <div className="open-chat__body">
        <ChatMessage avatar="./assets/honey-icon.png" user="User" message="Hello!" />
        <ChatMessage
          avatar="./assets/honey-icon.png"
          user="User"
          message="Hefddsljfgdsfiojgoj;dfsgjldfgjidfgdfgllo!"
          owner
        />
        {/* <ChatMessage avatar="./assets/honey-icon.png" user="User" message="Hello!" />
        <ChatMessage
          avatar="./assets/honey-icon.png"
          user="User"
          message="Hello!"
          owner
        />
        <ChatMessage avatar="./assets/honey-icon.png" user="User" message="Hello!" />
        <ChatMessage
          avatar="./assets/honey-icon.png"
          user="User"
          message="Hello!"
          owner
        /> */}
      </div>

      <ChatInput
        rightElement={<IconButton icon="send" click={() => {}} />}
        id="message"
        name="message"
        value={message}
        type="text"
        change={e => setMessage(e.target.value)}
        placeholder="Напишите Ваше сообщение"
        required
        textarea
      />
    </section>
  );
};

export default OpenChat;
