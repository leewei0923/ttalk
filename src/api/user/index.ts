import request from '@src/request/index';
import { host, RequestType } from '../index';

interface searchUserType extends RequestType {
  info: { account: string; motto: string; nickname: string };
}

export const apiSearchUser = async (data: {
  account: string;
}): Promise<Object> => await request.post<searchUserType>(`${host}/ttalk/searchUser`, data);
