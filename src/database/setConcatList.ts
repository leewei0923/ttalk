import { db } from './db';
import dayjs from 'dayjs';

/**
 * 用于更新聊天页面用户列表
 * @param account
 */
export function UpdateConcatList(account: string): void {
  const curDate = dayjs().format('YYYY-MM-DD HH:mm');
  db.concatList
    .where({ friend_account: account })
    .toArray()
    .then((res) => {
      if (res.length <= 0) {
        db.concatList
          .add({
            friend_account: account,
            create_time: curDate,
            update_time: curDate,
            message_count: 0
          })
          .catch((err) => console.log('添加失败', err));
      } else {
        db.concatList
          .where({ friend_account: account })
          .modify({
            update_time: curDate
          })
          .catch((err) => console.log('更新失败', err));
      }
    })
    .catch((err) => console.log('查找失败失败', err));
}

/**
 *
 */

interface ConcatListType {
  account: string;
  avatar: string;
  nickname: string;
  count: number;
  update_time: string;
  message: string;
}


/**
 * 排序用户聊天列表
 * @param account 
 * @param list 
 * @returns 
 */
export function TosortTheConcat(
  account: string,
  list: ConcatListType[]
): ConcatListType[] {
  const curDate = dayjs().format('YYYY-MM-DD HH:mm');
  for (let i = 0; i < list.length; i++) {
    if (list[i].account === account) {
      list[i].update_time = curDate;
      break;
    }
  }

  list.sort((a, b) => {
    return (
      new Date(b.update_time).getTime() - new Date(a.update_time).getTime()
    );
  });

  return list;
}
