import { db } from './db';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getUserInfo(account: string) {
  const res = await db.userInfoData
    .where({
      account
    })
    .first()
    .catch((err) => {
      console.log('查找用户出错', err);
    });

  return res;
}
