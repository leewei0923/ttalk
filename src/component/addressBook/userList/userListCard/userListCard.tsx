import { Avatar } from '@arco-design/web-react';
import React from 'react';
import styles from './userListCard.module.scss';

interface UserListCardPropsType {
  avatarUrl: string;
  name: string;
  account: string;
  status: 'online' | 'offline';
  onClick: (account: string) => void;
}

export function UserListCard(props: UserListCardPropsType): JSX.Element {
  const { avatarUrl, name, status, account, onClick } = props;

  return (
    <div
      className={styles.container}
      onClick={() => (typeof onClick === 'function' ? onClick(account) : '')}
    >
      {typeof avatarUrl === 'string' && avatarUrl !== '' ? (
        <img src={avatarUrl} className={styles.avatar_img} />
      ) : (
        <Avatar
          style={{ backgroundColor: '#14a9f8', marginLeft: 20 }}
          autoFixFontSize={false}
          size={35}
          shape="square"
        >
          {typeof name === 'string' && name.length > 0
            ? name
            : account?.charAt(0)}
        </Avatar>
      )}
      <p className={styles.name}>
        {typeof name === 'string' && name.length > 0 ? name : account}
      </p>

      <div className={styles.status_box}>
        <span
          className={`${styles.sign_circel} ${
            status === 'online' ? '' : styles.offline_span
          }`}
        ></span>
        <p
          className={`${styles.sign_text} ${
            status === 'online' ? '' : styles.offline
          }`}
        >
          {status === 'online' ? '在线' : '离线'}
        </p>
      </div>
    </div>
  );
}
