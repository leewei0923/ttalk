import Dexie from 'dexie';
import { GetTtakLoginUser } from '@src/common/personInfo';
import { userInfoType } from '@src/types/index';

const userInfo: userInfoType[] | '' = GetTtakLoginUser();

// 存放验证信息
export interface chat_user_concat_entry {
  id?: string;
  remote_id: string;
  user_account: string;
  friend_account: string;
  add_time: string;
  update_time: string;
  friend_flag: boolean;
  verifyInformation: string;
  remark: string;
  blacklist: boolean;
  tags: string;
  type: 'apply' | 'accept'; // apply 用于申请列表, accept 用于联系人列表
  ip: string;
}

// 所有联系人的个人信息
export interface chat_user_info_entry {
  id?: string;
  remote_id: string;
  nickname: string;
  motto: string;
  account: string;
  avatar: string;
  bird_date: string;
  social: string;
  create_time: string; // 账号创建时间
  add_time: string; // 第一次添加到本地的时间
  update_time: string; // 本地更新时间
}

// 消息栏好友列表

export interface chat_concat_list_entry {
  friend_account: string;
  create_time: string;
  update_time: string;
  message_count: number;
}

type chat_user_concat_table<
  T extends chat_user_concat_entry = chat_user_concat_entry
> = Dexie.Table<T, chat_user_concat_entry>;

type chat_user_info_table<
  T extends chat_user_info_entry = chat_user_info_entry
> = Dexie.Table<T, chat_user_info_entry>;

type chat_concat_list_table<
  T extends chat_concat_list_entry = chat_concat_list_entry
> = Dexie.Table<T, chat_concat_list_entry>;

class ChatDataBase extends Dexie {
  friends: chat_user_concat_table;
  userInfoData: chat_user_info_table;
  concatList: chat_concat_list_table;

  constructor(DBName: string) {
    super(DBName);

    this.version(2).stores({
      friends:
        '++id,[user_account+friend_flag+blacklist],[friend_account+friend_flag], remote_id,user_account,friend_account,add_time,update_time,friend_flag,verifyInformation,remark,blacklist,tags,ip',
      userInfoData: `++id, remote_id, nickname, motto, account, avatar, bird_date, social, create_time, add_time, update_time`,
      concatList: `++id, friend_account, create_time, update_time, message_count`
    });

    this.friends = this.table('friends');
    this.userInfoData = this.table('userInfoData');
    this.concatList = this.table('concatList');
  }
}

export const db = new ChatDataBase(
  `chatDatabase_${userInfo === '' ? '' : userInfo[0].account}`
);

db.concatList.hook('updating', function () {
  
});

// export const db = new Dexie('myDatabase');
// db.version(1).stores({
//   friends: '++id, name, age', // Primary key and indexed props
// });
