import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  name: string;
  email: string;
  chats: string[];
  userLoading: boolean;
  userError?: string;
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  chats: [],
  userLoading: false,
  userError: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
    // fetch reducers
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

export const { setUser, userRequest, userSuccess, userFailure } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
