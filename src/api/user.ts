import { socket } from './socketIo';

// login
export const loginUser = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    socket.emit('user:login', { email, password });
    socket.on('user:loginSuccess', data => {
      console.log(data);
      resolve(data);
    });
    socket.on('error', error => {
      reject(new Error(error.message || 'Ошибка при логине'));
    });
  });
};

// register
export const registerUser = (name: string, email: string, password: string) => {
  return new Promise((resolve, reject) => {
    socket.emit('user:register', { name, email, password });
    socket.on('user:registerSuccess', data => {
      resolve(data);
    });
    socket.on('user:registerError', error => {
      reject(new Error(error.message || 'Ошибка при регистрации'));
    });
  });
};
