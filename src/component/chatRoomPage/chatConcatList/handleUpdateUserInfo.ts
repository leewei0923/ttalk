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
          console.log('updateInfo: ', infoRes);

          if (typeof infoRes === 'object') {
            if (typeof infoRes !== 'object') return;

            console.log(updateInfo);
            db.userInfoData
              .update(infoRes, {
                id: updateInfo.id,
                account: updateInfo.account,
                nickname: updateInfo.nickname,
                bird_date: updateInfo.bird_date,
                social: updateInfo.social,
                motto: updateInfo.motto,
                avatar: updateInfo.avatar,
                update_time: updateInfo.update_time,
                remote_id: '',
                create_time: updateInfo.add_time,
                add_time: updateInfo.add_time
              })
              .then((res) => {
                console.log('res', res);
              })
              .catch((err) => console.log('更新用户信息异常', err));
          }
        })
        .catch((err) => console.log('更新用户信息异常', err));
    })
    .catch((err) => console.log('查找资料出错', err));
}
