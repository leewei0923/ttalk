/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { globalNotice } from '../store';

interface newMessageType {
  name: string;
  remote_id: string;
  friend_account: string;
}

type noticeType = 'addFriend' | newMessageType | '';

const initialNotice: noticeType = '';

export const NoticeSlice = createSlice({
  name: 'note',
  initialState: initialNotice,
  reducers: {
    setDetailNotice: (
      state: noticeType,
      action: PayloadAction<noticeType>
    ): any => {
      return action.payload ?? state;
    }
  }
});

export const { setDetailNotice } = NoticeSlice.actions;

export const selectGlobalNotice = (state: globalNotice): noticeType => {
  return state.globalNotice;
};

export default NoticeSlice;
