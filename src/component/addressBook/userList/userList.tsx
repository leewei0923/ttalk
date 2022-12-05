/* eslint-disable indent */
import { IconUserAdd } from '@arco-design/web-react/icon';
import { apiLoadMyfriends, apiUserDetailInfo } from '@src/api/chat';
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
import {
  addDb,
  genFriendNameList,
  insertUserInfo,
  updateUserInfo
} from './handlekeepFriendList';
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
  const loginUser = GetTtakLoginUser();

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

  async function loadAllFriends(): Promise<void> {
    if (loginUser === '') return;
    const list = await genFriendNameList(loginUser[0].account);
    apiLoadMyfriends({
      user_account: loginUser[0].account,
      friend_accounts: list
    })
      .then((res) => {
        if (res.code === 200) {
          for (let i = 0; i < res.info.length; i++) {
            void addDb(res.info[i]);
          }
        }
      })
      .catch((err) => console.log('出错了', err));

    updateUserInfo(loginUser[0].account)
      .then((res) => {
        apiUserDetailInfo({
          user_account: loginUser[0].account,
          accounts: res
        })
          .then((userinfos) => {
            if (userinfos.code === 200) {
              void insertUserInfo(userinfos.info);
            }
          })
          .catch((err) => console.log('出错了', err));
      })
      .catch((err) => console.log('出错了', err));
  }

  // 点击人物卡片获取account
  useEffect(() => {
    // 加载用户的信息，是否存在差异
    void loadAllFriends();

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
