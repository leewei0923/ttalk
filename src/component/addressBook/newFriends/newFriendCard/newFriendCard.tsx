import { Avatar } from '@arco-design/web-react';
import React from 'react';
import styles from './newFriendCard.module.scss';

interface NewFriendsProps {
  onChangePageMode?: (str: string) => void;
  avatar: string;
  account: string;
  nickname: string;
  date: string;
  active: boolean;
  validText: string;
}

export function NewFriendsCard(props: NewFriendsProps): JSX.Element {
  /**
   * 公共区域
   */
  const { account, avatar, active, nickname, date, validText } = props;

  // =========================
  return (
    <div className={styles.container}>
      <section className={styles.avatar_box}>
        {avatar}

        {typeof avatar === 'string' && avatar !== '' ? (
          <img src={avatar} className={styles.avatar} />
        ) : (
          <Avatar
            style={{ backgroundColor: '#14a9f8' }}
            autoFixFontSize={false}
            size={35}
            shape="square"
          >
            {nickname ?? account?.charAt(0)}
          </Avatar>
        )}
      </section>
      <section className={styles.name_box}>
        <p className={styles.nickname}>{nickname ?? account}</p>
        <p className={styles.message}>{validText}</p>
      </section>
      <section className={styles.options}>
        <span className={styles.time}>{date}</span>
        {active ? (
          <div className={styles.accept_text}>已接受</div>
        ) : (
          <button className={styles.accept_btn}>接受</button>
        )}
      </section>
    </div>
  );
}
