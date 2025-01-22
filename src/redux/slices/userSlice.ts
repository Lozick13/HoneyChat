import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  name: string;
  email: string;
  avatar: number;
  chats: string[];
  userLoading: boolean;
  userError?: string;
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  avatar: 0,
  chats: [],
  userLoading: false,
  userError: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // reducer to set user
    setUser: (
      state,
      action: PayloadAction<{ id: string; name: string; email: string; chats: string[] }>,
    ) => {
      const { id, name, email, chats } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.chats = chats;
    },
    setAvatar: (state, action: PayloadAction<number>) => {
      state.avatar = action.payload;
    },
    // login or register
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    avatarRequest: _state => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setAvatarRequest: (_state, _action: PayloadAction<number>) => {},
    userRequest: (
      state, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        name?: string;
        email: string;
        password: string;
        method: 'login' | 'register';
      }>,
    ) => {
      state.userLoading = true;
      state.userError = undefined;
    },
    userFailure: (state, action: PayloadAction<string>) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    userSuccess: state => {
      state.userLoading = false;
      state.userError = undefined;
    },
  },
});

export const {
  setUser,
  setAvatar,
  avatarRequest,
  setAvatarRequest,
  userRequest,
  userSuccess,
  userFailure,
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
