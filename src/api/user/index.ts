import { request } from '@src/request/index';
// import { RequestType } from '../index';

interface searchUserType {
  status: 'ok' | 'fail';
  code: number;
  msg: string;
  user: Array<{
    account: string;
    motto: string;
    nickname: string;
    avatar: string;
  }>;
}

export const apiSearchUser = async (data: {
  account: string;
}): Promise<searchUserType> =>
  await request.post<searchUserType>(`/ttalk/searchUser`, data, {
    timeout: 15000
  });

interface AddFriendRequest {
  user_account: string;
  friend_account: string;
  friend_flag: boolean; // 是否是朋友,申请时为false
  verifyInformation: string; // 验证信息
  remark: string;
  blacklist: boolean;
  tags: string;
  type: 'apply' | 'accept' | 'black';
}

interface AddFriendRes {
  status: 'ok' | 'fail';
  code: number;
  msg: string;
}

export const apiAddFriend = async (
  data: AddFriendRequest
): Promise<AddFriendRes> =>
  await request.post<AddFriendRes>(`/ttalk/addFriend`, data, {
    timeout: 15000
  });
