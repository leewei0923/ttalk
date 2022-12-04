/* eslint-disable indent */
import { IconUserAdd } from '@arco-design/web-react/icon';
import { apiCheckOnline } from '@src/api/user';
import { GetTtakLoginUser } from '@src/common/personInfo';
import { pageStateType } from '@src/types';
import {
  friendsRes,
  genUserList,
  mergeList,
  userListTyep
} from '@src/util/genUserList';
import React, { useEffect, useState } from 'react';
// import { user } from './stateData';
import styles from './userList.module.scss';
import { UserListCard } from './userListCard/userListCard';

interface UserListProps {
  onChangePageMode: (data: pageStateType) => void;
}

export function UserList(props: UserListProps): JSX.Element {
  /**
   * 公共区域
   */
  const { onChangePageMode } = props;

  // ========================

  // const userData = genUserList();
  const [concats, setConcats] = useState<userListTyep[]>();

  // 获取在线状态
  const onGetOnlineStatus = async (): Promise<
    Array<{
      account: string;
      status: 'online' | 'offline';
    }>
  > => {
    const accounts = await friendsRes();
    const onlineStatus = await apiCheckOnline({
      type: 'get',
      to_account: accounts
    });

    if (onlineStatus.code !== 200) {
      return [];
    }

    return onlineStatus.account_status;
  };

  // 点击人物卡片获取account
  useEffect(() => {
    if (GetTtakLoginUser() !== '') {
      void onGetOnlineStatus().then((res) => {
        genUserList((list) => {
          setConcats(() => {
            return mergeList(list, res);
          });
        });
      });
    }

    
  }, []);

  // console.log(userData);

  return (
    <div className={styles.container}>
      <h2 className={styles.address_title}>通讯录</h2>
      <div className={styles.line}></div>

      <section className={styles.user_container}>
        <div
          className={styles.add_user_box}
          onClick={() =>
            onChangePageMode({ type: 'friend', content: 'newFriends' })
          }
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
        {Array.isArray(concats)
          ? concats.map((user, i) => {
              return (
                <div key={`user${i}`} className={styles.user_part_box}>
                  <p className={styles.user_part_text}>{user.sign}</p>
                  <div className={styles.user_list_box}>
                    {user.children.map((u, i) => {
                      return (
                        <UserListCard
                          account={u.account}
                          key={`userInfo${i}`}
                          avatarUrl={u.avatar_url}
                          name={u.name}
                          status={u.status}
                          onClick={(account: string) => {
                            onChangePageMode({
                              type: 'account',
                              content: account
                            });
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })
          : ''}
      </section>
    </div>
  );
}
