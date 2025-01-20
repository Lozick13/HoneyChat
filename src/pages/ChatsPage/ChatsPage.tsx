import { useEffect } from 'react';
import ChatsList from '../../components/ChatsList/ChatsList';
import OpenChat from '../../components/OpenChat/OpenChat';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { chatsRequest } from '../../redux/slices/chatsSlice';
import './chatspage.scss';

const ChatsPage = () => {
  const dispatch = useAppDispatch();
  const { chats: chatsId } = useAppSelector(state => state.user);
  const { chats, activeChat, chatsLoading, chatsError } = useAppSelector(
    state => state.chats,
  );

  useEffect(() => {
    dispatch(chatsRequest(chatsId));
  }, [chatsId, dispatch]);

  return (
    <>
      <main className="chats">
        <ChatsList
          loading={chatsLoading}
          error={chatsError}
          chats={chats}
          activeChat={activeChat}
        />
        <OpenChat />
      </main>
    </>
  );
};

export default ChatsPage;
