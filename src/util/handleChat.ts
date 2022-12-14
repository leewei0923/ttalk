/* eslint-disable @typescript-eslint/naming-convention */
import { db } from '@src/database/db';
import dayjs from 'dayjs';

export interface MessageData {
  date: string;
  children: MessageDetailData[];
  [key: string]: unknown;
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
    const meesageRes = await db.messageData
      .where({
        friend_account: friendAccount
      })
      .reverse()
      .limit(10)
      .sortBy('create_time', (res) => {
        res.sort((a, b) => {
          if (a.create_time === b.create_time) {
            return parseInt(a.id ?? '') - parseInt(b.id ?? '');
          } else {
            return (
              new Date(a.create_time).getTime() -
              new Date(b.create_time).getTime()
            );
          }
        });
        return res;
      });

    if (meesageRes.length <= 0) {
      return '';
    }

    const chatData = this.outFormatMessageData(meesageRes);

    return chatData;
  }

  async loadMessage(friendAccount: string): Promise<MessageData[] | ''> {
    const mesageRes = await db.messageData
      .where({
        friend_account: friendAccount
      })
      .reverse()
      .limit(10)
      .sortBy('create_time', (res) => {
        res.sort((a, b) => {
          if (a.create_time === b.create_time) {
            return parseInt(a.id ?? '') - parseInt(b.id ?? '');
          } else {
            return (
              new Date(a.create_time).getTime() -
              new Date(b.create_time).getTime()
            );
          }
        });
        return res;
      });

    if (mesageRes.length <= 0) {
      return '';
    }

    const chatData = this.outFormatMessageData(mesageRes);

    return chatData;
  }

  async loadHistoryMessages(
    friendAccount: string,
    createTime: string,
    formatMessages: MessageData[]
  ): Promise<MessageData[]> {
    const mesageRes = await db.messageData
      .where({
        friend_account: friendAccount
      })
      .and((res) => {
        return (
          new Date(res.create_time).getTime() < new Date(createTime).getTime()
        );
      })
      .reverse()
      .limit(10)
      .sortBy('create_time', (res) => {
        res.sort((a, b) => {
          if (a.create_time === b.create_time) {
            return parseInt(b.id ?? '') - parseInt(a.id ?? '');
          } else {
            return (
              new Date(b.create_time).getTime() -
              new Date(a.create_time).getTime()
            );
          }
        });
        return res;
      });

    const chatData = this.outFormatMessageData(
      mesageRes,
      formatMessages,
      'unshift'
    );
    return chatData;
  }

  outFormatMessageData(
    messages: MessageDetailData[],
    formatMessages?: MessageData[],
    method?: 'push' | 'unshift'
  ): MessageData[] {
    if (Array.isArray(formatMessages)) {
      return this.addMessageData(messages, formatMessages, method);
    } else {
      return this.createMessageData(messages);
    }
  }

  private createMessageData(messages: MessageDetailData[]): MessageData[] {
    const map = new Map<string, MessageDetailData[]>();

    for (let i = 0; i < messages.length; i++) {
      const dateKey = messages[i].create_time.split(' ')[0];

      if (map.has(dateKey)) {
        const messageList = map.get(dateKey);
        messageList?.push(messages[i]);
        if (messageList !== undefined) {
          map.set(dateKey, messageList);
        }
      } else {
        map.set(dateKey, [messages[i]]);
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

  /**
   * 从原始的数组中添加数据
   * @param messages
   * @param formatMessages
   * @returns
   */
  private addMessageData(
    messages: MessageDetailData[],
    formatMessages: MessageData[],
    method?: 'push' | 'unshift'
  ): MessageData[] {
    for (let i = 0; i < messages.length; i++) {
      const dayDate = messages[i].create_time.split(' ')[0];
      const idx = this.binarySearch(formatMessages, dayDate);
      if (idx === null) {
        formatMessages.push({
          date: dayDate,
          children: [messages[i]]
        });
      } else if (method === 'unshift') {
        formatMessages[idx].children.unshift(messages[i]);
      } else {
        formatMessages[idx].children.push(messages[i]);
      }
    }

    return formatMessages;
  }

  /**
   *  查找时间相同的
   * @param list 格式化的聊天信息列表
   * @param target 查找的目标值
   * @returns number
   */
  private binarySearch(list: MessageData[], target: string): number | null {
    const len = list.length;
    list.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    let l = 0;
    let r = len - 1;
    let ans: number | null = null;

    while (l <= r) {
      const mid = Math.floor((r - l) / 2) + l;

      if (list[mid].date === target) {
        ans = mid;
        break;
      } else if (
        new Date(list[mid].date).getTime() < new Date(target).getTime()
      ) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return ans;
  }

  /**
   *
   * @param messageData
   * @param message
   * @param type
   * @returns
   */
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

  // 更新阅读标记
  updateReadFlagDb(friend_account: string, message_id: string): void {
    console.log(
      'friend_account: string, message_id: string: ',
      friend_account,
      message_id
    );

    db.messageData
      .where(['friend_account', 'remote_id'])
      .equals([friend_account, message_id])
      .modify({ read_flag: true })
      .catch((err) => {
        console.log('更新消息阅读标记失败', err);
      });
  }
}
