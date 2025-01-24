import { Dispatch, UnknownAction } from '@reduxjs/toolkit/react';
import { useEffect } from 'react';
import { socket } from '../../api/socketIo';
import { getUserChats } from '../../api/user';
import ChatsList from '../../components/ChatsList/ChatsList';
import OpenChat from '../../components/OpenChat/OpenChat';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  chatRequest,
  chatsFailure,
  chatsRequest,
  setActiveChat,
} from '../../redux/slices/chatsSlice';
import './chatspage.scss';

// get chats
const getChats = async (dispatch: Dispatch<UnknownAction>, userId: string) => {
  if (!userId) return;

  try {
    const chats = (await getUserChats(userId)) as string[];
    dispatch(chatsRequest(chats));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(chatsFailure(error.message));
    } else {
      dispatch(chatsFailure('Неизвестная ошибка'));
    }
  }
};

// hook for handling chat events
const useChatEvents = (dispatch: Dispatch<UnknownAction>, userId: string) => {
  useEffect(() => {
    // chat update
    const handleChatUpdate = (id: string) => {
      dispatch(chatRequest(id));
    };

    // leave chat
    const handleDeleteUserSuccess = (deletedUserId: string) => {
      if (deletedUserId === userId) {
        dispatch(setActiveChat(undefined));
        socket.emit('chat:leaveChat', userId);
      }
    };

    // update chats when leaving
    const handleLeaveChatSuccess = async () => {
      getChats(dispatch, userId);
    };

    socket.on('chat:update', handleChatUpdate);
    socket.on('chat:deleteUserSuccess', handleDeleteUserSuccess);
    socket.on('chat:leaveChatSuccess', handleLeaveChatSuccess);

    return () => {
      socket.off('chat:update', handleChatUpdate);
      socket.off('chat:deleteUserSuccess', handleDeleteUserSuccess);
      socket.off('chat:leaveChatSuccess', handleLeaveChatSuccess);
    };
  }, [dispatch, userId]);
};

// hook to get users chats
const useFetchChats = (dispatch: Dispatch<UnknownAction>, userId: string) => {
  useEffect(() => {
    getChats(dispatch, userId);
  }, [userId, dispatch]);
};

const ChatsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(state => state.user);
  const { chats, activeChat, chatsLoading, chatsError } = useAppSelector(
    state => state.chats,
  );

  useFetchChats(dispatch, id);
  useChatEvents(dispatch, id);

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
