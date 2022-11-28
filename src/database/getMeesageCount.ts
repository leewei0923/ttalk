import { db } from './db';

interface MessageAlertType {
  message: number;
  addFriend: number;
}

export async function getMessageCount(
  account: string
): Promise<MessageAlertType> {
  const newFriendCount = await db.friends
    .where({
      friend_account: account,
      type: 'apply'
    })
    .filter((res) => !res.friend_flag)
    .count();

  const messageCount = await db.messageData
    .where({
      user_account: account,
      type: 'receive'
    })
    .filter((res) => !res.read_flag)
    .count();

  return { message: messageCount, addFriend: newFriendCount };
}
