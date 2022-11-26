import { request } from '@src/request/index';

export interface UpdateConcatReq {
  user_account: string; // 申请人账号
  friend_account: string; // 被申请人账号
  blacklist?: boolean;
}

export interface UpdateConcatRes {
  code: number;
  status: 'ok' | 'fail';
  msg: string;
  info?: UpdateConcatInfoRes;
}

interface UpdateConcatInfoRes {
  friend_account: string;
  blacklist_status: boolean;
  friend_status: boolean;
}

// 拉入黑名单
export const apiAddFriendBlackList = async (
  data: UpdateConcatReq
): Promise<UpdateConcatRes> =>
  await request.post<UpdateConcatRes>(`/ttalk/updateConcatBlacklist`, data, {
    timeout: 15000
  });

// 隐藏 | 删除好友
export const apiUpdateFriendShip = async (
  data: UpdateConcatReq
): Promise<UpdateConcatRes> =>
  await request.post<UpdateConcatRes>(`/ttalk/deleteFriend`, data, {
    timeout: 15000
  });
