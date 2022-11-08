import { request } from '@src/request/index';
import { RequestType } from '../index';

interface ReqestOKType extends RequestType {
  start_time: number;
  end_time: number;
  login_status: boolean;
  userInfo: Object;
  token: string;
}

export const apiRegister = async (data: Object): Promise<Object> =>
  await request.post(`/ttalk/register`, data);

export const apiLogin = async (data: Object): Promise<ReqestOKType | any> =>
  await request.post(`/ttalk/login`, data);
