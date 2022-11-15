/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { globalAccount } from '../store';

type accountType = string;

const initialNotice: accountType = '';

export const AccountSlice = createSlice({
  name: 'note',
  initialState: initialNotice,
  reducers: {
    setGlobalAccount: (
      state: accountType,
      action: PayloadAction<accountType>
    ): any => {
      return action.payload ?? state;
    }
  }
});

export const { setGlobalAccount } = AccountSlice.actions;

export const selectGlobalAccount = (state: globalAccount): accountType => {
  return state.globalAccount;
};

export default AccountSlice;
