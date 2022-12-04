import { chat_message_data_entry, db } from '@src/database/db';
import { clearText, handleText } from '@src/util/handleJSON';
import { JSONContent } from '@tiptap/react';

export enum TABSTYPE {
  'ALL' = 'all',
  'MINE' = 'mine',
  'FRIEND' = 'friend'
}

export async function GetMessage(
  loginAccount: string,
  friend: string,
  type: TABSTYPE
): Promise<chat_message_data_entry[]> {
  if (type === TABSTYPE.ALL) {
    return await getAllMessage(loginAccount, friend);
  } else if (type === TABSTYPE.MINE) {
    return await getSigleMessage(friend, 'send');
  } else {
    return await getSigleMessage(friend, 'receive');
  }
}

export async function getSigleMessage(
  account: string,
  type: string
): Promise<chat_message_data_entry[]> {
  const messageRes = await db.messageData
    .where(['friend_account', 'type'])
    .equals([account, type])
    .toArray();
  return messageRes;
}

export async function getAllMessage(
  login: string,
  friend: string
): Promise<chat_message_data_entry[]> {
  const messageRes = await db.messageData
    .where(['user_account', 'friend_account'])
    .equals([login, friend])
    .toArray();

  return messageRes;
}

export function getText(contents: chat_message_data_entry[]): string {
  let allTexts = '';
  for (let i = 0; i < contents.length; i++) {
    const jsonContent: JSONContent = JSON.parse(contents[i].message);
    allTexts += handleText(jsonContent);
    clearText();
  }

  return allTexts;
}

/**
 *
 * @param str string
 * @returns
 */
export function splitChineseTexts(str: string): Intl.SegmentData[] {
  return Array.from(
    new Intl.Segmenter('cn', {
      granularity: 'word'
    }).segment(str)
  );
}

/**
 * 用于统计次数的
 * @param list Array<Array<string | number>>
 * @returns
 */
export function AddUpText(
  list: Intl.SegmentData[]
): Array<Array<string | number>> {
  const map = new Map<string, number>();

  for (let i = 0; i < list.length; i++) {
    if (list[i].isWordLike ?? false) {
      if (map.has(list[i].segment)) {
        map.set(list[i].segment, map.get(list[i].segment) ?? 0 + 1);
      } else {
        map.set(list[i].segment, 1);
      }
    }
  }

  const resList: Array<Array<string | number>> = [];

  map.forEach((v, k) => {
    resList.push([k, v]);
  });

  return resList;
}
