import { socket } from './socketIo';

// login
export const loginUser = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    socket.emit('user:login', { email, password });
    socket.on('user:loginSuccess', data => {
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

// get user avatar
export const getAvatar = (token: string) => {
  return new Promise((resolve, reject) => {
    socket.emit('user:getProfilePicture', token);
    socket.on('user:getProfilePictureSuccess', data => {
      resolve(data);
    });
    socket.on('error', () => {
      reject(0);
    });
  });
};

// set user avatar
export const setAvatarById = (token: string, avatar: number) => {
  return new Promise((resolve, reject) => {
    socket.emit('user:setProfilePicture', token, avatar);
    socket.on(
      'user:setProfilePictureSuccess',
      (data: { id: string; name: string; avatar: number }) => {
        resolve(data);
      },
    );
    socket.on('error', () => {
      reject(0);
    });
  });
};

// get user info
export const getUserInfoById = (id: string) => {
  return new Promise((resolve, reject) => {
    socket.emit('user:getUserInfo', id);
    socket.on('user:getUserInfoSuccess', data => {
      resolve(data);
    });
    socket.on('error', error => {
      reject(error);
    });
  });
};

export const getUserChats = (id: string) => {
  return new Promise((resolve, reject) => {
    socket.emit('user:getUserChats', id);
    socket.on('user:getUserChatsSuccess', data => {
      resolve(data);
    });
    socket.on('error', error => {
      reject(error);
    });
  });
};
