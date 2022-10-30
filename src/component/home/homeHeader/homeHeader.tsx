import classnames from 'classnames';
import React, { useState } from 'react';
// import { IconDragDot } from '@arco-design/web-react/icon';
import avatar from '@pic/pic/logo.png';
import styles from './homeHeader.module.scss';

export function HomeHeader(): JSX.Element {
  // 控制menu显/藏 , true 为显示, false 为隐藏
  const [menuFlag, setMenuFlag] = useState(false);

  const onOpenMenu = (): void => {
    setMenuFlag(!menuFlag);
  };

  const classOptions = {
    menu: classnames({
      [styles.menu]: true,
      [styles.menu_selected]: menuFlag
    }),
    mask: classnames({
      [styles.mask]: true,
      [styles.nav_selected]: menuFlag
    }),
    nav_box_mobile: classnames({
      [styles.nav_box_mobile]: true,
      [styles.nav_selected]: menuFlag
    })
  };
  return (
    <div className={styles.container}>
      <section className={styles.title_box}>
        <p className={styles.title_text}>TTalk</p>
      </section>

      {/* 菜单 */}
      <div className={classOptions.menu} onClick={() => onOpenMenu()}>
        <div
          style={{
            width: 30,
            height: 30,
            padding: '10px',
            position: 'absolute',
            top: -10,
            left: -10,
            zIndex: 0
          }}
        ></div>
      </div>

      <div className={classOptions.mask}></div>

      {/* 导航栏 */}

      <section className={classOptions.nav_box_mobile}>
        <div className={styles.nav_item}>首页</div>
        <div className={styles.nav_item}>了解更多</div>
        <div className={styles.nav_item}>更多特性</div>
        <div className={styles.nav_item}>我的空间</div>
        <div className={styles.nav_item}>我的笔记</div>
        <div className={styles.nav_item}>注册</div>
        <div className={styles.nav_item}>登录</div>
        <div className={styles.login}>
          <img src={avatar} className={styles.img} />
          <div className={styles.login_out_btn}>退出</div>
        </div>
      </section>

      {/* 导航栏 */}

      <section className={styles.nav_container}>
        <div className={styles.left_box}>
          <a className={styles.link}>首页</a>
          <a className={styles.link}>了解新特性</a>
          <a className={styles.link}>我的空间</a>
          <a className={styles.link}>我的笔记</a>
        </div>

        <div className={styles.right_box}>
          <a className={styles.link} href="/login/in">登录</a>
          <a className={styles.link} href="/login/up">注册</a>

          <img src={avatar} className={styles.img_pc} />
          <button className={styles.login_out_btn}>退出</button>
        </div>
      </section>
    </div>
  );
}
