import './chatpreview.scss';

const ChatPreview = ({
  click,
  avatar,
  user,
  message,
}: {
  click: () => void;
  avatar: string;
  user: string;
  message: string;
}) => {
  return (
    <article onClick={click} className="chat-preview">
      <img className="chat-preview__img" src={avatar} alt="Аватарка" />
      <div className="chat-preview__info">
        <h3 className="chat-preview__name">{user}</h3>
        <p className="chat-preview__message">{message}</p>
      </div>
    </article>
  );
};

export default ChatPreview;
