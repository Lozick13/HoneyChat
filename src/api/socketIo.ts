import { io } from 'socket.io-client';

export const URL = 'http://localhost:3000';
export const socket = io(URL);
