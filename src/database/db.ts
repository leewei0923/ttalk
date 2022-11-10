import Dexie from 'dexie';

export interface chat_user_concat_entry {
  id: string;
  user_account: string;
  friend_account: string;
  add_time: string;
  update_time: string;
  friend_flag: boolean;
  verifyInformation: string;
  remark: string;
  blackliist: boolean;
  tags: string;
  ip: string;
}

type chat_user_concat_table<
  T extends chat_user_concat_entry = chat_user_concat_entry
> = Dexie.Table<T, chat_user_concat_entry['id']>;

class ChatDataBase extends Dexie {
  friends: chat_user_concat_table;

  constructor(DBName: string) {
    super(DBName);
    this.version(1).stores({
      friends:
        'id,user_account,friend_account,add_time,update_time,friend_flag,verifyInformation,remark,blackliist,tags,ip'
    });

    this.friends = this.table('friends');
  }
}

export const db = new ChatDataBase('chatDatabase');

// export const db = new Dexie('myDatabase');
// db.version(1).stores({
//   friends: '++id, name, age', // Primary key and indexed props
// });
