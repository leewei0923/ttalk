import { GetTtakLoginUser } from '@src/common/personInfo';
import { db } from '@src/database/db';
import { TosortTheConcat, UpdateConcatList } from '@src/database/setConcatList';
import { selectGlobalAccount, setGlobalAccount } from '@src/redux/account';
import { useAppSelector } from '@src/redux/hook';
import { trimmedDate } from '@src/util/handleTime';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ContcatSumaryCard } from '../contactSumaryCard/contactSummaryCard';
import styles from './chatConcatList.module.scss';
import { updateUserInfo } from './handleUpdateUserInfo';

export function ChatConcatList(): JSX.Element {
  // const data = new Array(10).fill(0);

  /**
   * 公共区域
   */
  const loginUser = GetTtakLoginUser();
  const globalAccount = useAppSelector(selectGlobalAccount);
  const dispatch = useDispatch();

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
    const friendsRes = await db.concatList
      .orderBy('update_time')
      .reverse()
      .toArray();
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
    UpdateConcatList(account);
    setConcatList(TosortTheConcat(account, concatList));
    dispatch(setGlobalAccount(account));

    /**
     * 更新用户资料
     */
    if (
      typeof loginUser === 'object' &&
      loginUser[0].account !== globalAccount
    ) {
      updateUserInfo(account);
    }
  };

  useEffect(() => {
    if (concatList.length <= 0) {
      void getDataBaseConcatList();
    }
  }, [globalAccount, concatList]);

  return (
    <div className={styles.container}>
      {concatList.map((item, index) => {
        return (
          <ContcatSumaryCard
            account={item.account}
            globalAccount={globalAccount}
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
