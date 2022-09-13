import React, { useState } from 'react';
import { leftTabOptions } from './leftOptions';
import styles from './chatPageLeftBar.module.scss';
import { useNavigate } from 'react-router-dom';

export function ChatPageLeftBar(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);
  const navigateTo = useNavigate();

  const onSwitchTab = function (index: number, path: string): void {
    setCurrentTab(index);
    navigateTo(path);
  };

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
                index === currentTab ? styles.isSlected : ''
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
