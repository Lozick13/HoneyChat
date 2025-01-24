import { io } from 'socket.io-client';

export const URL = process.env.PATH || 'https://api.honeychat.na4u.ru';
export const socket = io(URL);
