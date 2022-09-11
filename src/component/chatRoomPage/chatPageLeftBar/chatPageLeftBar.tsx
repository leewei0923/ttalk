import React, { useState } from 'react';
import { leftTabOptions } from './leftOptions';
import styles from './chatPageLeftBar.module.scss';

export function ChatPageLeftBar(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);

  const onSwitchTab = function (index: number): void {
    setCurrentTab(index);
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
              onClick={() => onSwitchTab(index)}
            >
              {/* <IconMessage style={{ width: '30px', strokeWidth: 3 }} /> */}
              {item.icon}
              <p>{item.name}</p>
            </section>
          );
        })}

        {/* <section className={defaultClassNames.left_nav_btn_box}>
          <IconMessage style={{ width: '30px', strokeWidth: 3 }} />
          <p>消息</p>
        </section> */}

        {/* <section className={styles.left_nav_btn_box}>
          <IconUserGroup style={{ width: '30px', strokeWidth: 3 }} />
          <p>通讯录</p>
        </section>

        <section className={styles.left_nav_btn_box}>
          <IconCommon
            className="arco-icon"
            style={{ width: '30px', strokeWidth: 3 }}
          />
          <p>应用</p>
        </section>

        <section className={styles.left_nav_btn_box}>
          <IconUser style={{ width: '30px', strokeWidth: 3 }} />
          <p>我的</p>
        </section>

        <section className={styles.left_nav_btn_box}>
          <IconStar style={{ width: '30px', strokeWidth: 3 }} />
          <p>收藏</p>
        </section> */}
      </div>
    </div>
  );
}
