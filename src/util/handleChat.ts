/* eslint-disable @typescript-eslint/naming-convention */
import { db } from '@src/database/db';
import dayjs from 'dayjs';

export interface MessageData {
  date: string;
  children: MessageDetailData[];
}

export interface MessageDetailData {
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
}

export class HandleChat {
  /**
   * 创建
   */

  async create(friendAccount: string): Promise<MessageData[] | ''> {
    const map = new Map<string, MessageDetailData[]>();
    const meesageRes = await db.messageData
      .where({
        friend_account: friendAccount
      })
      .toArray();

    if (meesageRes.length <= 0) {
      return '';
    }

    for (let i = 0; i < meesageRes.length; i++) {
      const dateKey = meesageRes[i].create_time.split(' ')[0];

      if (map.has(dateKey)) {
        const messageList = map.get(dateKey);
        messageList?.push(meesageRes[i]);
        if (messageList !== undefined) {
          map.set(dateKey, messageList);
        }
      } else {
        map.set(dateKey, [meesageRes[i]]);
      }
    }

    const chatData: MessageData[] = [];
    map.forEach((v, k) => {
      chatData.push({
        date: k,
        children: v
      });
    });

    return chatData;
  }

  insert(
    messageData: MessageData[] | '',
    message: MessageDetailData,
    type: 'push' | 'unshift'
  ): MessageData[] {
    const curDate = dayjs().format('YYYY-MM-DD');

    if (messageData === '') {
      const data: MessageData[] = [];
      data.push({
        date: curDate,
        children: [message]
      });

      return data;
    }

    const len = messageData.length;
    if (type === 'push') {
      messageData[len - 1].children.push(message);
    } else if (type === 'unshift') {
      messageData[0].children.unshift(message);
    }

    return messageData;
  }

  addDb(messageInfo: MessageDetailData): void {
    const curDate = dayjs().format('YYYY-MM-DD HH:mm');
    const {
      remote_id,
      user_account,
      friend_account,
      mood_state,
      type,
      message,
      message_style,
      read_flag,
      create_time
    } = messageInfo;
    db.messageData
      .add({
        remote_id,
        user_account,
        friend_account,
        mood_state,
        type,
        message,
        message_style,
        read_flag,
        create_time,
        update_time: curDate
      })
      .catch((err) => {
        console.log('添加聊天数据失败', err);
      });
  }
}
