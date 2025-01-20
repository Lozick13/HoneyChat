import './chatpreview.scss';

const ChatPreview = ({
  click,
  avatar,
  title,
  message,
  active,
}: {
  click: () => void;
  avatar: string;
  title: string;
  message: string;
  active?: boolean;
}) => {
  return (
    <article
      onClick={click}
      className={`chat-preview${active ? ' chat-preview_active' : ''}`}
    >
      <img className="chat-preview__img" src={avatar} alt="Аватарка" />
      <div className="chat-preview__info">
        <h3 className="chat-preview__name">{title}</h3>
        <p className="chat-preview__message">
          {message.length > 30 ? `${message.slice(0, 30)}...` : message}
        </p>
      </div>
    </article>
  );
};

export default ChatPreview;
