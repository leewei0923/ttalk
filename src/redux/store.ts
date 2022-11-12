import { configureStore } from '@reduxjs/toolkit';
import NoticeReducer from './notice/index';

export const store = configureStore({
  reducer: {
    globalNotice: NoticeReducer.reducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type globalNotice = ReturnType<typeof store.getState>;

