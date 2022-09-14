import React from 'react';
import styles from './userListCard.module.scss';

interface UserListCardPropsType {
  avatarUrl: string;
  name: string;
  status: 'online' | 'offline';
}

export function UserListCard(props: UserListCardPropsType): JSX.Element {
  const { avatarUrl, name, status } = props;

  return (
    <div className={styles.container}>
      <img src={avatarUrl} className={styles.avatar_img} />
      <p className={styles.name}>{name}</p>

      <div className={styles.status_box}>
        <span className={`${styles.sign_circel} ${status === 'online' ? '' : styles.offline_span}`}></span>
        <p className={`${styles.sign_text} ${status === 'online' ? '' : styles.offline}`}>{status === 'online' ? '在线' : '离线'}</p>
      </div>
    </div>
  );
}
