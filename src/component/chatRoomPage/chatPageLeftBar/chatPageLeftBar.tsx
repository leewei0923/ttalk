/* eslint-disable indent */
import React, { useState } from 'react';
import { leftTabOptions } from './leftOptions';
import styles from './chatPageLeftBar.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@src/redux/hook';
import { selectGlobalAccount } from '@src/redux/account/index';
import { GetTtakLoginUser } from '@src/common/personInfo';
import { Avatar } from '@arco-design/web-react';
import { firstValidNumber } from '@src/util/util';
import { LeftUserCard } from './leftUserCard/leftUserCard';

export function ChatPageLeftBar(): JSX.Element {
  const [curentTabr, setCurrentTab] = useState(0);
  const navigateTo = useNavigate();
  const globalAccount = useAppSelector(selectGlobalAccount);
  const { chatId } = useParams();
  const userInfoData = GetTtakLoginUser();

  console.log(globalAccount);

  const onSwitchTab = function (index: number, path: string): void {
    setCurrentTab(index);
    navigateTo(path);
  };

  return (
    <div className={styles.container}>
      {/* 头像 */}
      <div className={styles.avatar_box}>

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

      <div className={styles.options_container}>
        {leftTabOptions.map((item, index) => {
          return (
            <section
              className={`${styles.left_nav_btn_box} ${
                item.sign === (chatId ?? leftTabOptions[curentTabr])
                  ? styles.isSlected
                  : ''
              }`}
              key={item.name}
              onClick={() => onSwitchTab(index, item.path)}
            >
              {/* <IconMessage style={{ width: '30px', strokeWidth: 3 }} /> */}
              {item.icon}
              <p>{item.name}</p>
            </section>
          );
        })}
      </div>
        
      <LeftUserCard />
    </div>
  );
}
