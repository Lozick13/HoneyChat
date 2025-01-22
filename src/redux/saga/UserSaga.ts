import { PayloadAction } from '@reduxjs/toolkit';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { loginUser, registerUser } from '../../api/user';
import { decodedToken } from '../../helpers/token';
import { setUser, userFailure, userRequest, userSuccess } from '../slices/userSlice';
import { retryCount, retryDelay } from './retrySettings';

// user request processing
function* workerUserRequest(
  action: PayloadAction<{
    name?: string;
    email: string;
    password: string;
    method: 'login' | 'register';
  }>,
) {
  try {
    const { method, email, password } = action.payload;
    let data: { token: string };

    // login
    if (method === 'login') {
      data = yield retry(retryCount, retryDelay, loginUser, email, password);
    }
    // register
    else {
      const { name } = action.payload;
      // throws an error if the name is missing
      if (!name) throw new Error('Имя обязательно для регистрации');
      data = yield retry(retryCount, retryDelay, registerUser, name, email, password);
    }

    // token saving
    const { token } = data;
    localStorage.setItem('token', token);

    // set user and success
    const { id, name, chats } = decodedToken(token);
    yield put(setUser({ id, name, email, chats }));
    yield put(userSuccess());
  } catch (error: unknown) {
    if (error instanceof Error) yield put(userFailure(error.message));
    else yield put(userFailure('Неизвестная ошибка'));
  }
}

export function* watchUserSaga() {
  yield takeLatest(userRequest, workerUserRequest);
}
