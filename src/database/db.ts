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
  id?: string;
  friend_account: string;
  create_time: string;
  update_time: string;
  message_count: number;
}

/**
 * 存储聊天内容
 */
export interface chat_message_data_entry {
  id?: string;
  remote_id: string;
  user_account: string;
  friend_account: string;
  mood_state: string;
  type: 'send' | 'receive';
  message_style: 'normal' | 'rich'; // 聊天的风格
  message: string; // 聊天的内容
  read_flag: boolean; // 阅读标记
  create_time: string;
  update_time: string;
  fail?: boolean;
}

/**
 * 存储收藏
 */
export interface collect_data_entry {
  id?: string;
  collect_id: string;
  account: string;
  content: string;
  origin: string;
  type: string;
  create_time: string;
  update_time: string;
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

type chat_message_data_table<
  T extends chat_message_data_entry = chat_message_data_entry
> = Dexie.Table<T, chat_message_data_entry>;

type collect_data_table<T extends collect_data_entry = collect_data_entry> =
  Dexie.Table<T, collect_data_entry>;

class ChatDataBase extends Dexie {
  friends: chat_user_concat_table;
  userInfoData: chat_user_info_table;
  concatList: chat_concat_list_table;
  messageData: chat_message_data_table;
  collectData: collect_data_table;

  constructor(DBName: string) {
    super(DBName);

    this.version(20).stores({
      friends:
        '++id,[user_account+friend_flag+blacklist],[friend_account+user_account], [friend_account+friend_flag],[friend_account+type],[friend_account+type+friend_flag], remote_id,user_account,friend_account,add_time,update_time,friend_flag,verifyInformation,remark,blacklist,tags,type, ip',
      userInfoData: `++id, remote_id, nickname, motto, account, avatar, bird_date, social, create_time, add_time, update_time`,
      concatList: `++id, friend_account, create_time, update_time, message_count`,
      messageData: `++id,remote_id,[friend_account+remote_id],[remote_id+fail],[friend_account+type], [user_account+type],[user_account+remote_id], [user_account+friend_account],[friend_account+type+read_flag], user_account, friend_account, mood_state, type, message_style, message, read_flag, create_time, update_time`,
      collectData: `++id, [account+type], remote_id, account, type, collect_id`
    });

    this.friends = this.table('friends');
    this.userInfoData = this.table('userInfoData');
    this.concatList = this.table('concatList');
    this.messageData = this.table('messageData');
    this.collectData = this.table('collectData');
  }
}

export const db = new ChatDataBase(
  `chatDatabase_${userInfo === '' ? '' : userInfo[0].account}`
);

db.concatList.hook('updating', function () {});

// export const db = new Dexie('myDatabase');
// db.version(1).stores({
//   friends: '++id, name, age', // Primary key and indexed props
// });
