import { GetTtakLoginUser } from '@src/common/personInfo';
import { db } from '@src/database/db';
import { trimmedDate } from '@src/util/handleTime';
import React, { useEffect, useState } from 'react';
import { ContcatSumaryCard } from '../contactSumaryCard/contactSummaryCard';
import styles from './chatConcatList.module.scss';

export function ChatConcatList(): JSX.Element {
  // const data = new Array(10).fill(0);

  /**
   * 公共区域
   */
  const loginUser = GetTtakLoginUser();

  // ===============

  interface ConcatListType {
    account: string;
    avatar: string;
    nickname: string;
    count: number;
    update_time: string;
    message: string;
  }

  const [concatList, setConcatList] = useState<ConcatListType[]>([]);

  async function getDataBaseConcatList(): Promise<void> {
    const friendsRes = await db.concatList.orderBy('update_time').reverse().toArray();
    const list: ConcatListType[] = [];

    for (let i = 0; i < friendsRes.length; ++i) {
      const friendInfo = await db.userInfoData
        .where({
          account: friendsRes[i].friend_account
        })
        .first();

      if (friendInfo !== undefined) {
        list.push({
          account: friendInfo.account,
          avatar: friendInfo.avatar,
          nickname: friendInfo.nickname,
          count: friendsRes[i].message_count,
          update_time: friendsRes[i].update_time,
          message: ''
        });
      } else if (
        loginUser !== '' &&
        friendsRes[i].friend_account === loginUser[0].account
      ) {
        list.push({
          account: loginUser[0].account,
          avatar: loginUser[0].avatar,
          nickname: loginUser[0].nickname,
          count: friendsRes[i].message_count,
          update_time: friendsRes[i].update_time,
          message: ''
        });
      }
    }

    setConcatList(list);
  }

  /**
   * 获取account
   */
  const onGetAccount = (account: string): void => {
    console.log(account);
  };

  useEffect(() => {
    void getDataBaseConcatList();
  }, []);

  return (
    <div className={styles.container}>
      {concatList.map((item, index) => {
        return (
          <ContcatSumaryCard
            account={item.account}
            avatarUrl={item.avatar}
            nickname={item.nickname}
            message=""
            time={trimmedDate(item.update_time)}
            key={`card${index}`}
            onClick={onGetAccount}
          />
        );
      })}
    </div>
  );
}
