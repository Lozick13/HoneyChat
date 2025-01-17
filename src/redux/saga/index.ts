import { spawn } from 'redux-saga/effects';
import { watchUserSaga } from './UserSaga';

export function* saga() {
  yield spawn(watchUserSaga);
}
