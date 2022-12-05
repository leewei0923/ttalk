import { apiGetAndUpdateAccountInfo } from '@src/api/user';
import { db } from '@src/database/db';
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
