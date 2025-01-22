import './chatmessage.scss';

interface ChatsListProps {
  avatar: string;
  user: string;
  message: string;
  time: string;
  owner?: boolean;
}

const ChatMessage = ({ avatar, user, message, time, owner }: ChatsListProps) => {
  return (
    <article className={`chat-message ${owner ? 'chat-message_owner' : ''}`}>
      <img className="chat-message__img" src={avatar} alt="Аватар" />
      <div className="chat-message__info">
        <h3 className="chat-message__title">{user}</h3>
        <p className="chat-message__text">{message}</p>
      </div>
      <div className="chat-message__time">{time}</div>
    </article>
  );
};

export default ChatMessage;
