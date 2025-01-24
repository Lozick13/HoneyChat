import { useEffect } from 'react';
import { socket } from '../../api/socketIo';
import { getUserChats } from '../../api/user';
import ChatsList from '../../components/ChatsList/ChatsList';
import OpenChat from '../../components/OpenChat/OpenChat';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { chatRequest, chatsRequest, setActiveChat } from '../../redux/slices/chatsSlice';
import './chatspage.scss';

const ChatsPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const { chats, activeChat, chatsLoading, chatsError } = useAppSelector(
    state => state.chats,
  );
  const getChats = async () => {
    if (!user.id) return;
    const chats = (await getUserChats(user.id)) as string[];
    console.log(chats);
    dispatch(chatsRequest(chats));
  };

  useEffect(() => {
    getChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, dispatch]);

  useEffect(() => {
    const handleChatUpdate = async (id: string) => {
      dispatch(chatRequest(id));
    };
    socket.on('chat:update', handleChatUpdate);

    const handleDeleteUserSuccess = (userId: string) => {
      if (userId === user.id) {
        dispatch(setActiveChat(undefined));
        socket.emit('chat:leaveChat', userId);
      }
    };
    socket.on('chat:deleteUserSuccess', handleDeleteUserSuccess);

    const handleLeaveChatSuccess = async () => {
      await getChats();
    };
    socket.on('chat:leaveChatSuccess', handleLeaveChatSuccess);

    return () => {
      socket.off('chat:update', handleChatUpdate);
      socket.off('chat:deleteUserSuccess', handleDeleteUserSuccess);
    };
  }, [socket, dispatch, user]);

  return (
    <main className="chats">
      <ChatsList
        loading={chatsLoading}
        error={chatsError}
        chats={chats}
        activeChat={activeChat}
      />
      <OpenChat />
    </main>
  );
};

export default ChatsPage;
