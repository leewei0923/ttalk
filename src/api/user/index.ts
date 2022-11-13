import { request } from '@src/request/index';
import { CommonRes } from '..';
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

/**
 * 用于登录状态查询
 */
interface checkOnlineType {
  type: 'get';
  to_account: string[];
}

export interface checkOnlineRes extends CommonRes {
  account_status: Array<{
    account: string;
    status: 'online' | 'offline';
  }>;
}

export const apiCheckOnline = async (
  data: checkOnlineType
): Promise<checkOnlineRes> =>
  await request.post<checkOnlineRes>(`/ttalk/checkOnline`, data, {
    timeout: 15000
  });

/**
 * 更新信息
 */
interface UpdateUserInfoReq {
  account: string;
  nickname: string;
  bird_date: string;
  social: string;
  motto: string;
  avatar: string;
}

export const apiUpdateUserInfo = async (
  data: UpdateUserInfoReq
): Promise<CommonRes> =>
  await request.post<CommonRes>(`/ttalk/updateInfo`, data, {
    timeout: 15000
  });
