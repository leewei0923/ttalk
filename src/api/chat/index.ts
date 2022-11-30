import { request } from '@src/request/index';
import { CommonRes } from '..';

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

// 加载离线事件

export interface LoadLastestMessage {
  user_account: string;
  friend_account: string;
  event_type: 'messaging' | 'read' | 'addFriend';
  create_time: string;
  update_time: string;
  event_detail?: string;
}

export interface LoadLastestMessageRes extends CommonRes {
  info: LoadLastestMessage[];
}

export const apiOfflineEvents = async (data: {
  account: string;
}): Promise<LoadLastestMessageRes> =>
  await request.post<LoadLastestMessageRes>(`/ttalk/loadLatestEvents`, data, {
    timeout: 15000
  });

/**
 * 加载离线最新用户消息
 */
interface MessageType {
  message_id: string;
  user_account: string;
  friend_account: string;
  message: string;
  mood_state: string;
  message_style: 'rich' | 'normal';
  read_flag: boolean;
  create_time: string;
}

interface MessagesRes extends CommonRes {
  info: MessageType[];
}

export const apiLoadLastestMessage = async (data: {
  user_account: string;
  friend_account: string;
  create_time: string;
}): Promise<MessagesRes> =>
  await request.post<MessagesRes>(`/ttalk/loadLatestMessages`, data, {
    timeout: 15000
  });

export interface UpdateReadFlagRes extends CommonRes {
  info: {
    send_account: string; // 当前登录的账号
    receive_account: string; // 朋友账号
    message_ids: string[];
  };
}

export const apiUpdateReadFlag = async (data: {
  send_account: string;
  receive_account: string;
}): Promise<UpdateReadFlagRes> =>
  await request.post<UpdateReadFlagRes>(`/ttalk/updateReadFlag`, data, {
    timeout: 15000
  });
