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
    // reducer to set up a chat list
    setChats: (state, action: PayloadAction<ChatPreview[]>) => {
      state.chats = action.payload;
    },
    // reducer for updating chat by ID
    setChat: (state, action: PayloadAction<{ chat: ChatPreview; id: string }>) => {
      state.chats = state.chats.map(chat =>
        chat.id === action.payload.id ? action.payload.chat : chat,
      );
    },
    // reducer to set active chat
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },

    // reducers for handling chat uploads
    chatsRequest: (
      state, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<string[]>,
    ) => {
      state.chatsLoading = true;
      state.chatsError = undefined;
    },
    chatRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<string>,
    ) => {
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

export const {
  setChats,
  setChat,
  setActiveChat,
  chatsRequest,
  chatRequest,
  chatsFailure,
  chatsSuccess,
} = chatsSlice.actions;

const chatsReducer = chatsSlice.reducer;
export default chatsReducer;
