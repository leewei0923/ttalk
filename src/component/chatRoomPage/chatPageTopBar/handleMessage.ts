import { db } from '@src/database/db';
import dayjs from 'dayjs';

export async function onDbConcatList(friend_account: string): Promise<void> {
  const curDate = dayjs().format('YYYY-MM-DD HH:mm');
  const concatRes = await db.concatList
    .where({
      friend_account
    })
    .toArray();

  if (concatRes.length === 0) {
    await db.concatList.add({
      friend_account,
      message_count: 1,
      create_time: curDate,
      update_time: curDate
    });
  } else {
    await db.concatList
      .where('friend_account')
      .equals(friend_account)
      .modify({
        message_count: concatRes[0].message_count + 1,
        update_time: curDate
      });
  }
}
