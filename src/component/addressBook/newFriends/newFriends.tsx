/* eslint-disable indent */
/* eslint-disable react/jsx-key */
import { db } from '@src/database/db';
import React, { useEffect, useState } from 'react';
import styles from './newFriend.module.scss';
import { NewFriendsCard } from './newFriendCard/newFriendCard';
import Storage from '@src/util/localStorage';
import { userInfoType } from '@src/types';

interface NewFriendsProps {
  onChangePageMode?: (str: string) => void;
}

interface FriendType {
  account: string;
  avatar: string;
  active: boolean;
  nickname: string;
  date: string;
  validText: string;
}

export function NewFriends(props: NewFriendsProps): JSX.Element {
  /**
   * 公共区域
   */

  const [friends, setFriends] = useState<FriendType[]>();
  const localStorage = new Storage();
  const userInfo: userInfoType[] = JSON.parse(
    localStorage.getStorage('chat-user-info')
  );

  // =========================

  /**
   * 此处 friend_account == userInfo[0].account, user_account 是对方好友的
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getDataBase = async () => {
    const friendApplicants = await db.friends
      .where({
        friend_account: userInfo[0].account
      })
      .sortBy('user_account');

    // 用户信息
    // TODO: 查找信息

    const friendsList: FriendType[] = [];

    for (let i = 0; i < friendApplicants.length; i++) {
      const userInfoData = await db.userInfoData
        .where({ account: friendApplicants[i].user_account })
        .toArray();
      const newFriend: FriendType = {
        account: friendApplicants[i].user_account,
        avatar: userInfoData[i].avatar,
        nickname: userInfoData[i].nickname,
        validText: friendApplicants[i].verifyInformation,
        date: friendApplicants[i].update_time,
        active: friendApplicants[i].friend_flag
      };

      friendsList.push(newFriend);
    }

    setFriends(friendsList);
  };

  useEffect(() => {
    void getDataBase();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.top_title}>新的朋友</h2>

      {Array.isArray(friends) && friends?.length > 0
        ? friends?.map((item) => {
            return (
              <NewFriendsCard
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                key={`new${item.account}`}
                account={item.account}
                avatar={item.avatar}
                active={item.active}
                nickname={item.nickname}
                date={item.date}
                validText={item.validText}
              />
            );
          })
        : ''}
    </div>
  );
}
