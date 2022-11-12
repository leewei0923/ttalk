import Dexie from 'dexie';
import Storage from '@src/util/localStorage';
import { userInfoType } from '@src/types/index';

const localStorage = new Storage();
const userInfo: userInfoType[] = JSON.parse(
  localStorage.getStorage('chat-user-info')
);

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
  type: "apply" | "accept"; // apply 用于申请列表, accept 用于联系人列表
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
}

type chat_user_concat_table<
  T extends chat_user_concat_entry = chat_user_concat_entry
> = Dexie.Table<T, chat_user_concat_entry>;

type chat_user_info_table<
  T extends chat_user_info_entry = chat_user_info_entry
> = Dexie.Table<T, chat_user_info_entry>;

class ChatDataBase extends Dexie {
  friends: chat_user_concat_table;
  userInfoData: chat_user_info_table;

  constructor(DBName: string) {
    super(DBName);
    
    this.version(1).stores({
      friends:
        '++id, remote_id,user_account,friend_account,add_time,update_time,friend_flag,verifyInformation,remark,blacklist,tags,ip',
      userInfoData: `++id, remote_id, nickname, motto, account, avatar, bird_date, social`
    });

    this.friends = this.table('friends');
    this.userInfoData = this.table('userInfoData');
  }
}

export const db = new ChatDataBase(`chatDatabase_${userInfo[0].account}`);

// export const db = new Dexie('myDatabase');
// db.version(1).stores({
//   friends: '++id, name, age', // Primary key and indexed props
// });
