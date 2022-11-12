/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { globalNotice } from '../store';

type noticeType = 'addFriend' | '';

const initialNotice: noticeType = '';

export const NoticeSlice = createSlice({
  name: 'note',
  initialState: initialNotice,
  reducers: {
    setDetailNote: (
      state: noticeType,
      action: PayloadAction<noticeType>
    ): any => {
      return action.payload ?? state;
    }
  }
});

export const { setDetailNote } = NoticeSlice.actions;

export const selectGlobalNotice = (state: globalNotice): noticeType => {
  return state.globalNotice;
};

export default NoticeSlice;
