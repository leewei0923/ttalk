import { handleText, clearText } from '@src/util/handleJSON';
import { JSONContent } from '@tiptap/react';
import { db } from './db';

/**
 * 返回未读消息的数量
 * @param account string
 * @returns number
 */
export async function GetUnreadCount(account: string): Promise<number> {
  const count = await db.messageData
    .where(['account', 'type'])
    .equals([account, 'receive'])
    .filter((res) => {
      return !res.read_flag;
    })
    .count();

  return count;
}

export async function LatestMessage(account: string): Promise<string> {
  const messageRes = await db.messageData
    .where({
      friend_account: account
    })
    .last();

  if (messageRes !== undefined) {
    const account =
      messageRes.type === 'send'
        ? messageRes.user_account
        : messageRes.friend_account;
    const textJson: JSONContent = JSON.parse(messageRes.message);

    const text = handleText(textJson);
    clearText();

    return `${account}: ${text}`;
  } else {
    return '';
  }
}
