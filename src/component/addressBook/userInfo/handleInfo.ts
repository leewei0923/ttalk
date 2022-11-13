import { db } from '@src/database/db';

/**
 * 帮助处理用户信息的问题
 */

export interface handleInfoRes {
  nickname: string;
  avatar: string;
  bird_date: string;
  motto: string;
  social: string;
  remark: string;
  add_time: string;
  blacklist: boolean;
  tags: string;
}

export async function handleInfo(account: string): Promise<handleInfoRes> {
  const friends = await db.friends
    .where({
      friend_account: account
    })
    .toArray();

  const friendInfos = await db.userInfoData
    .where({
      account
    })
    .toArray();

  const { blacklist, remark, add_time: addTime, tags } = friends[0];

  const {
    nickname,
    avatar,
    bird_date: birdDate,
    motto,
    social
  } = friendInfos[0];

  const userList: handleInfoRes = {
    nickname,
    avatar,
    bird_date: birdDate,
    motto,
    social,
    remark,
    add_time: addTime,
    blacklist,
    tags
  };

  return userList;
}
