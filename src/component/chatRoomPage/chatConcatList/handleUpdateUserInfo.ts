import { concatRes } from '@src/api/chat';
import { apiGetAndUpdateAccountInfo } from '@src/api/user';
import {  db } from '@src/database/db';
import dayjs from 'dayjs';

export function updateUserInfo(account: string): void {
  const curDate = dayjs().format('YYYY-MM-DD HH:mm');
  db.userInfoData
    .where({
      account
    })
    .first()
    .then((infoRes) => {
      apiGetAndUpdateAccountInfo({
        account: infoRes?.account ?? '',
        update_time: infoRes?.update_time ?? curDate
      })
        .then((updateInfo) => {
          if (typeof infoRes === 'object') {
            if (
              !Array.isArray(updateInfo.userInfoData) &&
              updateInfo.code !== 200
            )
              return;

            if (updateInfo.userInfoData.length <= 0) return;

            const {
              account,
              nickname,
              bird_date,
              social,
              motto,
              avatar,
              update_time,
              add_time
            } = updateInfo.userInfoData[0];

            db.userInfoData
              .where({ account: infoRes.account })
              .modify({
                account,
                nickname,
                bird_date,
                social,
                motto,
                avatar,
                update_time,
                remote_id: '',
                create_time: add_time,
                add_time
              })
              .catch((err) => console.log('更新用户信息异常', err));
          }
        })
        .catch((err) => console.log('更新用户信息异常', err));
    })
    .catch((err) => console.log('查找资料出错', err));
}

export async function compareLocal(accounts: string[]): Promise<{
  friends: string[];
  userInfoRes: string[];
}> {
  const compareList = {
    friends: new Array<string>(),
    userInfoRes: new Array<string>()
  };

  for (let i = 0; i < accounts.length; i++) {
    const friends = await db.friends
      .where('friend_account')
      .equals(accounts[i])
      .first();

    const userInfoRes = await db.userInfoData
      .where('account')
      .equals(accounts[i])
      .first();
    if (friends === undefined) {
      compareList.friends.push(accounts[i]);
    }

    if (userInfoRes === undefined) {
      compareList.userInfoRes.push(accounts[i]);
    }
  }

  return compareList;
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
