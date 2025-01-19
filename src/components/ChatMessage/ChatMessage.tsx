import './chatmessage.scss';

const ChatMessage = ({
  avatar,
  user,
  message,
  owner,
}: {
  avatar: string;
  user: string;
  message: string;
  owner?: boolean;
}) => {
  return (
    <article className={`chat-message ${owner ? 'chat-message_owner' : ''}`}>
      <img className="chat-message__img" src={avatar} alt="Аватар" />
      <div className="chat-message__info">
        <h3 className="chat-message__title">{user}</h3>
        <p className="chat-message__text">{message}</p>
      </div>
      <div className="chat-message__time">10:25</div>
    </article>
  );
};

export default ChatMessage;
