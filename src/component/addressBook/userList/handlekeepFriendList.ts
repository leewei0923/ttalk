import { concatRes, userInfoRes } from '@src/api/chat';
import { chat_user_info_entry, db } from '@src/database/db';

/**
 * 生成好友列表供对比，以此为凭据
 * @param account
 * @returns
 */
export async function genFriendNameList(account: string): Promise<string[]> {
  const friendRes = await db.friends
    .where('user_account')
    .equals(account)
    .toArray();
  const friends: string[] = [];

  for (let i = 0; i < friendRes.length; i++) {
    friends.push(friendRes[i].friend_account);
  }

  return friends;
}

export async function addDb(data: concatRes): Promise<void> {
  await db.friends
    .add({
      remote_id: data.id,
      user_account: data.user_account,
      friend_account: data.friend_account,
      add_time: data.add_time,
      update_time: data.update_time,
      friend_flag: data.friend_flag,
      verifyInformation: data.verifyInformation,
      remark: data.remark,
      blacklist: data.blacklist,
      tags: data.tags,
      type: data.type, // apply 用于申请列表, accept 用于联系人列表
      ip: data.ip
    })
    .catch((err) => console.log('出现问题', err));
}

/**
 * 查找本地未更新的用户信息
 * @param account
 * @returns
 */
export async function updateUserInfo(account: string): Promise<string[]> {
  const userAccounts: string[] = [];
  const friends = await db.friends
    .where({
      user_account: account
    })
    .toArray();
  for (let i = 0; i < friends.length; i++) {
    const friendInfos = await db.userInfoData
      .where({
        account: friends[i].friend_account
      })
      .first();

    if (friendInfos === undefined) {
      userAccounts.push(friends[i].friend_account);
    }
  }
  return userAccounts;
}

export async function insertUserInfo(params: userInfoRes[]): Promise<void> {
  const userDbList: chat_user_info_entry[] = [];

  for (let i = 0; i < params.length; i++) {
    const {
      account,
      nickname,
      bird_date,
      social,
      motto,
      avatar,
      add_time,
      update_time
    } = params[i];

    const newUser: chat_user_info_entry = {
      remote_id: i.toString(),
      nickname,
      motto,
      account,
      avatar,
      bird_date,
      social,
      create_time: add_time,
      add_time,
      update_time
    };

    userDbList.push(newUser);
  }

  db.userInfoData.bulkAdd(userDbList).catch((err) => console.log('出错了', err));
}
