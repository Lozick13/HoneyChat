import ChatsList from '../../components/ChatsList/ChatsList';
import OpenChat from '../../components/OpenChat/OpenChat';
import './chatspage.scss';

const ChatsPage = () => {
  return (
    <>
      <main className="chats">
        <ChatsList />
        <OpenChat />
      </main>
    </>
  );
};

export default ChatsPage;
