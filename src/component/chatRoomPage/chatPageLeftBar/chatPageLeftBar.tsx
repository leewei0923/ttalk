import React, { useState } from 'react';
import { leftTabOptions } from './leftOptions';
import styles from './chatPageLeftBar.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@src/redux/hook';
import { selectGlobalAccount } from '@src/redux/account/index';

export function ChatPageLeftBar(): JSX.Element {
  const [curentTabr, setCurrentTab] = useState(0);
  const navigateTo = useNavigate();
  const globalAccount = useAppSelector(selectGlobalAccount);
  const { chatId } = useParams();

  console.log(globalAccount);

  const onSwitchTab = function (index: number, path: string): void {
    setCurrentTab(index);
    navigateTo(path);
  };

  console.log(useParams());

  return (
    <div className={styles.container}>
      {/* 头像 */}
      <div className={styles.avatar_box}>
        <img
          src={require('@pic/pic/logo.png')}
          alt="头像"
          className={styles.avatar_img}
        />
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
    </div>
  );
}
