import React from 'react';
import styles from './newFriendCard.module.scss';

interface NewFriendsProps {
  onChangePageMode?: (str: string) => void;
}

export function NewFriendsCard(props: NewFriendsProps): JSX.Element {
  /**
   * 公共区域
   */

  // =========================
  return (
    <div className={styles.container}>
      <section className={styles.avatar_box}>
        <img
          src="https://p3-passport.byteimg.com/img/user-avatar/e5212b3c9953329e701f49f33e78f5eb~100x100.awebp"
          className={styles.avatar}
        />
      </section>
      <section className={styles.name_box}>
        <p className={styles.nickname}>一个姓名千奇百怪</p>
        <p className={styles.message}>我的是你的好友</p>
      </section>
      <section className={styles.options}>
        <span className={styles.time}>2022.11.05 16:12</span>
        {/* <button className={styles.accept_btn}>接受</button> */}
        <div className={styles.accept_text}>已接受</div>
      </section>
    </div>
  );
}
