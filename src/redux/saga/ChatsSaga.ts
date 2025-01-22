import { PayloadAction } from '@reduxjs/toolkit';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { ChatPreview, getPreviewById } from '../../api/chats';
import {
  chatRequest,
  chatsFailure,
  chatsRequest,
  chatsSuccess,
  setChat,
  setChats,
} from '../slices/chatsSlice';
import { retryCount, retryDelay } from './retrySettings';

// chats request processing
function* workerChatsRequest(action: PayloadAction<string[]>) {
  try {
    const chatsId = action.payload;
    const chats: ChatPreview[] = [];

    //get chat previews, array filling
    for (const id of chatsId) {
      const chat: ChatPreview = yield retry(retryCount, retryDelay, getPreviewById, id);
      chats.push(chat);
    }

    // set chats and success
    yield put(setChats(chats));
    yield put(chatsSuccess());
  } catch (error: unknown) {
    if (error instanceof Error) yield put(chatsFailure(error.message));
    else yield put(chatsFailure('Неизвестная ошибка'));
  }
}

// chat request processing
function* workerChatRequest(action: PayloadAction<string>) {
  try {
    const id = action.payload;
    //get chat preview
    const chat: ChatPreview = yield retry(retryCount, retryDelay, getPreviewById, id);

    // set chat
    yield put(setChat({ chat, id }));
  } catch (error: unknown) {
    if (error instanceof Error) yield put(chatsFailure(error.message));
    else yield put(chatsFailure('Неизвестная ошибка'));
  }
}

export function* watchChatsSaga() {
  yield takeLatest(chatsRequest, workerChatsRequest);
  yield takeLatest(chatRequest, workerChatRequest);
}
