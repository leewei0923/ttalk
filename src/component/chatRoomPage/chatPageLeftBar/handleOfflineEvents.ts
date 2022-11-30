import { apiLoadLastestMessage } from '@src/api/chat';
import { HandleChat, MessageDetailData } from '@src/util/handleChat';
import dayjs from 'dayjs';

const handleChat = new HandleChat();

export enum OfflineEventTags {
  MESSAGEING = 'messaging',
  READ = 'read',
  ADDFRIEND = 'addFriend'
}

export interface parameterTypes {
  user_account: string;
  friend_account: string;
  create_time: string;
  event_detail?: string;
}

export interface OfflineEventsService {
  handleEvent: (params: parameterTypes) => void;
}

// 处理离线信息的加载
export class OfflineMessagingEvent implements OfflineEventsService {
  handleEvent(params: parameterTypes): void {
    const curDate = dayjs().format('YYYY-MM-DD HH-mm');
    const { user_account, friend_account, create_time } = params;
    apiLoadLastestMessage({
      user_account,
      friend_account,
      create_time
    })
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          for (let i = 0; i < res.info.length; i++) {
            const messageRes = res.info[i];

            const message: MessageDetailData = {
              remote_id: messageRes.message_id,
              user_account: messageRes.friend_account,
              friend_account: messageRes.user_account,
              mood_state: messageRes.mood_state,
              type: 'receive',
              message_style: messageRes.message_style,
              message: messageRes.message,
              read_flag: messageRes.read_flag,
              create_time: messageRes.create_time,
              update_time: curDate
            };

            handleChat.addDb(message);
          }
        }
      })
      .catch((err) => console.log('更新出现问题', err));
  }
}

// 处理离线阅读反馈消息的加载
export class OfflineFeedbackEvent implements OfflineEventsService {
  handleEvent(params: parameterTypes): void {
    console.log(params);
    const { user_account, event_detail } = params;
    // friend_account 为当前登录的账户

    if (typeof event_detail === 'string') {
      const message_ids: {
        type: 'read';
        message_id: string[];
      } = JSON.parse(event_detail);
      for (let i = 0; i < message_ids.message_id.length; i++) {
        handleChat.updateReadFlagDb(user_account, message_ids.message_id[i]);
      }
    }
  }
}

// 处理离线好友添加信息的加载
export class OfflineAddfriendEvent implements OfflineEventsService {
  handleEvent(params: parameterTypes): void {}
}

export const OFFLINE_EVENTS = {
  [OfflineEventTags.MESSAGEING]: () => new OfflineMessagingEvent(),
  [OfflineEventTags.ADDFRIEND]: () => new OfflineAddfriendEvent(),
  [OfflineEventTags.READ]: () => new OfflineFeedbackEvent()
};
