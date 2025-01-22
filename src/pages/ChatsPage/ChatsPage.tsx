import { useEffect } from 'react';
import { socket } from '../../api/socketIo';
import ChatsList from '../../components/ChatsList/ChatsList';
import OpenChat from '../../components/OpenChat/OpenChat';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { chatRequest, chatsRequest } from '../../redux/slices/chatsSlice';
import './chatspage.scss';

const ChatsPage = () => {
  const dispatch = useAppDispatch();
  const { chats: chatsId } = useAppSelector(state => state.user);
  const { chats, activeChat, chatsLoading, chatsError } = useAppSelector(
    state => state.chats,
  );

  // get init chats
  useEffect(() => {
    dispatch(chatsRequest(chatsId));
  }, [chatsId, dispatch]);

  // get updated chat
  useEffect(() => {
    socket.on('chat:update', ({ id }) => {
      dispatch(chatRequest(id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);

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
