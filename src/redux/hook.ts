/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './store';
import { globalNotice } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<globalNotice> = useSelector;
