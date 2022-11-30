/* eslint-disable @typescript-eslint/naming-convention */
import { db } from '@src/database/db';
import { MessageData } from '@src/util/handleChat';
/**
 * 阅读标记反馈提示处理反馈接收方(消息发送方)
 */
export interface messageFeedbackRes {
  user_account: string;
  friend_account: string;
  message_ids: string;
}

interface listProps {
  chatDatas: MessageData[] | '';
  feedback: messageFeedbackRes;
}
// 对信息的合并及时处理
export function messageFeedbackList(props: listProps): MessageData[] | '' {
  const { chatDatas, feedback } = props;
  if (chatDatas === '') return '';

  for (let i = 0; i < chatDatas.length; i++) {
    for (let j = 0; j < chatDatas[i].children.length; j++) {
      if (feedback.message_ids === chatDatas[i].children[j].remote_id) {
        chatDatas[i].children[j].read_flag = true;
        break;
      }
    }
  }
  return chatDatas;
}

// 对信息的数据库处理
export function messageFeedbackDB(res: messageFeedbackRes): void {
  const { friend_account, message_ids } = res;

  db.messageData
    .where(['user_account', 'remote_id'])
    .equals([friend_account, message_ids])
    .modify({
      read_flag: true
    })
    .catch((err) => console.log('阅读反馈更新出错,', err));
}
