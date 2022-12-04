import { apiUpdateFriendShip } from '@src/api/chat';
import { db } from '@src/database/db';

export function onDeleteList(friend_account: string): void {
  db.concatList
    .where({
      friend_account
    })
    .delete()
    .catch((err) => console.log('无法删除列表', err));
}

export function deleteUser(loginAccount: string, friend_account: string): void {
  if (loginAccount === friend_account) return;
  db.friends
    .where({
      friend_account
    })
    .delete()
    .catch((err) => console.log('无法删除好友账号', err));

  db.userInfoData
    .where({
      account: friend_account
    })
    .delete()
    .catch((err) => console.log('无法删除好友信息', err));
}

export function deleteUserChatRecord(
  loginAccount: string,
  friend_account: string
): void {
  db.messageData
    .where({
      friend_account
    })
    .delete()
    .catch((err) => console.log('无法删除好友账号', err));

  if (loginAccount !== friend_account) {
    apiUpdateFriendShip({
      user_account: loginAccount,
      friend_account,
      blacklist: false
    }).catch((err) => console.log('无法删除好友账号', err));
  }
}
