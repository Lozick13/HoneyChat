import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  auth: boolean;
  id: string;
  name: string;
  email: string;
  userLoading: boolean;
  userError?: string;
}

const initialState: UserState = {
  auth: false,
  id: '',
  name: '',
  email: '',
  userLoading: false,
  userError: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ id: string; name: string; email: string }>,
    ) => {
      const { id, name, email } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
    },
    setUserAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
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

export const { setUser, setUserAuth, userRequest, userSuccess, userFailure } =
  userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
