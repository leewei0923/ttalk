/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { globalMessageAlert } from '../store';

interface MessageAlertType {
  message: number;
  addFriend: number;
}

const initialAlert: MessageAlertType = {
  message: 0,
  addFriend: 0
};

export const MessageAlertSlice = createSlice({
  name: 'meesageAlert',
  initialState: initialAlert,
  reducers: {
    setMessageAlert: (
      state: MessageAlertType,
      action: PayloadAction<MessageAlertType>
    ): any => {
      return action.payload ?? state;
    }
  }
});

export const { setMessageAlert } = MessageAlertSlice.actions;

export const selectMessageAlert = (
  state: globalMessageAlert
): MessageAlertType => {
  return state.globalMessageAlert;
};

export default MessageAlertSlice;
