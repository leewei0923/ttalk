import { IconUserAdd } from '@arco-design/web-react/icon';
import React from 'react';
import { user } from './stateData';
import styles from './userList.module.scss';
import { UserListCard } from './userListCard/userListCard';

interface UserListProps {
  onChangePageMode: (str: string) => void;
}

export function UserList(props: UserListProps): JSX.Element {
  /**
   * 公共区域
   */
  const {onChangePageMode} = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.address_title}>通讯录</h2>
      <div className={styles.line}></div>

      <section className={styles.user_container}>
        <div
          className={styles.add_user_box}
          onClick={() => onChangePageMode('newFriends')}
        >
          <IconUserAdd
            style={{
              fontSize: '2rem',
              // backgroundColor: '#FFFFFF',
              strokeWidth: '2px',
              borderRadius: '50%'
            }}
          />
          <span>新的朋友</span>
        </div>
        {user.map((user, i) => {
          return (
            <div key={`user${i}`} className={styles.user_part_box}>
              <p className={styles.user_part_text}>{user.sign}</p>
              <div className={styles.user_list_box}>
                {user.children.map((u, i) => {
                  return (
                    <UserListCard
                      key={`userInfo${i}`}
                      avatarUrl={u.avatar_url}
                      name={u.name}
                      status={u.status}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
