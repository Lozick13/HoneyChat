import { socket } from './socketIo';

export interface UserMessage {
  id: string;
  name: string;
  avatar?: number;
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
