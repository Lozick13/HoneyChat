import { socket } from './socketIo';

export interface SentMessage {
  chatId: string;
  userId: string;
  text: string;
  time: string;
}

export interface UserMessage {
  id: string;
  name: string;
  avatar: number;
}

export interface Message {
  id: string;
  user: UserMessage;
  text: string;
  time: string;
}

export interface ChatPreview {
  id: string;
  title: string;
  message: string;
}

export interface Chat {
  id: string;
  users: string[];
  admin: string;
  title: string;
  messages: Message[];
}

// get chat preview
export const getPreviewById = (id: string) => {
  return new Promise(resolve => {
    socket.emit('chat:getPreviewById', id);
    socket.on('chat:getPreviewByIdSuccess', data => {
      resolve(data);
    });
  });
};

export const getChatById = (id: string) => {
  return new Promise(resolve => {
    socket.emit('chat:getById', id);
    socket.on('chat:getByIdSuccess', (data: Chat) => {
      resolve(data);
    });
  });
};

export const sendMessageById = (id: string, message: SentMessage) => {
  return new Promise(resolve => {
    socket.emit('chat:sendMessage', { id, message });
    socket.on('chat:sendMessageSuccess', (data: Chat) => {
      resolve(data);
    });
  });
};

export const deleteUserById = (id: string, userId: string) => {
  socket.emit('chat:deleteUser', { id, userId });
};

