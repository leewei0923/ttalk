/* eslint-disable indent */
import React from 'react';
import styles from './leftUserCard.module.scss';
import { GetTtakLoginUser } from '@src/common/personInfo';
import { Avatar, Tooltip } from '@arco-design/web-react';
import { firstValidNumber } from '@src/util/util';
import { IconRight } from '@arco-design/web-react/icon';
import { MOODDATAS, MoodDataType } from '@src/common/data';

interface LeftUserCardProps {
  onclick?: (
    mood?: MoodDataType,
    e?: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => void;
}

export function LeftUserCard(props: LeftUserCardProps): JSX.Element {
  const { onclick } = props;
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

      <section className={styles.mood_container}>
        {MOODDATAS.map((item) => {
          return (
            <Tooltip
              key={item.type}
              mini={true}
              style={{ fontSize: '0.6rem' }}
              color="#165DFF"
              position="br"
              content={item.name}
            >
              <img
                src={item.element}
                onClick={(e) =>
                  typeof onclick === 'function' ? onclick(item, e) : ''
                }
              />
            </Tooltip>
          );
        })}
      </section>

      <section className={styles.menus}>
        <div className={styles.menu_item}>
          <p>我的二维码</p>
          <IconRight style={{ fontSize: 20, marginRight: '20px' }} />
        </div>

        <div className={styles.menu_item}>
          <p>设置</p>
          <IconRight style={{ fontSize: 20, marginRight: '20px' }} />
        </div>

        <div className={styles.menu_item}>
          <p>退出登录</p>
          <IconRight style={{ fontSize: 20, marginRight: '20px' }} />
        </div>
      </section>
    </div>
  );
}
