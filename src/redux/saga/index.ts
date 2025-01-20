import { spawn } from 'redux-saga/effects';
import { watchChatsSaga } from './ChatsSaga';
import { watchUserSaga } from './UserSaga';

export function* saga() {
  yield spawn(watchUserSaga);
  yield spawn(watchChatsSaga);
}
