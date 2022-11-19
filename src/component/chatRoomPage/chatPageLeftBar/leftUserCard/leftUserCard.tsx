/* eslint-disable indent */
import React from 'react';
import styles from './leftUserCard.module.scss';
import { GetTtakLoginUser } from '@src/common/personInfo';
import { Avatar } from '@arco-design/web-react';
import { firstValidNumber } from '@src/util/util';

export function LeftUserCard(): JSX.Element {
  const userInfoData = GetTtakLoginUser();

  return (
    <div className={styles.container}>
      {/* 头像 */}
      <section className={styles.summary_container}>
        <div>
          {typeof userInfoData[0] === 'object' &&
          userInfoData[0]?.avatar !== '' ? (
            <img src={userInfoData[0]?.avatar} className={styles.avatar_img} />
          ) : (
            <Avatar
              style={{ backgroundColor: '#165DFF' }}
              autoFixFontSize={false}
              size={55}
              shape="circle"
            >
              {typeof userInfoData[0] === 'object' &&
              (userInfoData[0]?.nickname ?? '').length > 0
                ? firstValidNumber([
                    userInfoData[0].nickname.charAt(0),
                    userInfoData[0].account.charAt(0)
                  ])
                : ''}
            </Avatar>
          )}
        </div>

        <div className={styles.nickname}>
          {typeof userInfoData[0] === 'object'
            ? firstValidNumber([
                userInfoData[0].nickname,
                userInfoData[0].account
              ])
            : ''}
        </div>
      </section>
    </div>
  );
}
