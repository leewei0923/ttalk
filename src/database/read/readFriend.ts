/**
 * 统一经常使用的数据库中字段的代码
 */

import { db } from '../db';

/**
 * 查询好友的昵称
 * @param friend_account 好友账号
 */
export async function readFriendRemark(
  friend_account: string
): Promise<string> {
  const friendsRes = await db.friends
    .where({
      friend_account
    })
    .first();

  const name = friendsRes === undefined ? '' : friendsRes.remark;

  return name;
}
