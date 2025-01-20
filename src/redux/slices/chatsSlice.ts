import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatPreview } from '../../api/chats';

interface ChatsState {
  chats: ChatPreview[];
  activeChat?: string;
  chatsLoading: boolean;
  chatsError?: string;
}

const initialState: ChatsState = {
  chats: [],
  activeChat: undefined,
  chatsLoading: false,
  chatsError: undefined,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatPreview[]>) => {
      state.chats = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },

    // fetch reducers
    chatsRequest: (
      state, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<string[]>,
    ) => {
      state.chatsLoading = true;
      state.chatsError = undefined;
    },
    chatsFailure: (state, action: PayloadAction<string>) => {
      state.chatsLoading = false;
      state.chatsError = action.payload;
    },
    chatsSuccess: state => {
      state.chatsLoading = false;
      state.chatsError = undefined;
    },
  },
});

export const { setChats, setActiveChat, chatsRequest, chatsFailure, chatsSuccess } =
  chatsSlice.actions;

const chatsReducer = chatsSlice.reducer;
export default chatsReducer;
