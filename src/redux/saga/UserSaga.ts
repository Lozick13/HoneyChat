import { PayloadAction } from '@reduxjs/toolkit';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { loginUser, registerUser } from '../../api/user';
import {
  setUser,
  setUserAuth,
  userFailure,
  userRequest,
  userSuccess,
} from '../slices/userSlice';
import { retryCount, retryDelay } from './retrySettings';

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
    let data: { id: string; name: string; email: string };

    // fetch login
    if (method === 'login')
      data = yield retry(retryCount, retryDelay, loginUser, { email, password });
    // fetch register
    else {
      const { name } = action.payload;

      if (!name) {
        throw new Error('Имя обязательно для регистрации');
      }

      data = yield retry(retryCount, retryDelay, registerUser, { name, email, password });
    }

    // set user and auth
    yield put(setUser(data));
    yield put(setUserAuth(true));
    yield put(userSuccess());
  } catch (error: unknown) {
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'Unknown error';
    }

    yield put(userFailure(errorMessage));
  }
}

export function* watchUserSaga() {
  yield takeLatest(userRequest, workerUserRequest);
}
