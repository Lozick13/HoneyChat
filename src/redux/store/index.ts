import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { saga } from '../saga';
import chatsReducer from '../slices/chatsSlice';
import userReducer from '../slices/userSlice';

// saga middleware configuration, store
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
    chats: chatsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
