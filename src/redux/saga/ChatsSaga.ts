import { PayloadAction } from '@reduxjs/toolkit';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { ChatPreview, getChatPreview } from '../../api/chats';
import { chatsFailure, chatsRequest, chatsSuccess, setChats } from '../slices/chatsSlice';
import { retryCount, retryDelay } from './retrySettings';

// chats request processing
function* workerChatsRequest(action: PayloadAction<string[]>) {
  try {
    const chatsId = action.payload;
    const chats: ChatPreview[] = [];

    //get chat previews, array filling
    for (const id of chatsId) {
      const chat: ChatPreview = yield retry(retryCount, retryDelay, getChatPreview, id);
      chats.push(chat);
    }

    // set chats and success
    yield put(setChats(chats));
    yield put(chatsSuccess());
  } catch (error: unknown) {
    let errorMessage: string;
    if (error instanceof Error) errorMessage = error.message;
    else errorMessage = 'Неизвестная ошибка';
    yield put(chatsFailure(errorMessage));
  }
}

export function* watchChatsSaga() {
  yield takeLatest(chatsRequest, workerChatsRequest);
}
