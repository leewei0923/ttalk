import { configureStore } from '@reduxjs/toolkit';
import NoticeReducer from './notice/index';
import AccountReducer from './account/index';

export const store = configureStore({
  reducer: {
    globalNotice: NoticeReducer.reducer,
    globalAccount: AccountReducer.reducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type globalNotice = ReturnType<typeof store.getState>;
export type globalAccount = ReturnType<typeof store.getState>;

