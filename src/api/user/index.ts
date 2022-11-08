import { request } from '@src/request/index';
// import { RequestType } from '../index';

interface searchUserType {
  status: 'ok' | 'fail';
  code: number;
  msg: string;
  user: Array<{ account: string; motto: string; nickname: string; avatar: string }>;
}

export const apiSearchUser = async (data: {
  account: string;
}): Promise<searchUserType> =>
  await request.post<searchUserType>(`/ttalk/searchUser`, data, {
    timeout: 15000
  });
