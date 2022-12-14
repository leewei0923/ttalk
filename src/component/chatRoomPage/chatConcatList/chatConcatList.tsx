import { GetTtakLoginUser } from '@src/common/personInfo';
import { db } from '@src/database/db';
import { readFriendRemark } from '@src/database/read/readFriend';
import { TosortTheConcat, UpdateConcatList } from '@src/database/setConcatList';
import { selectGlobalAccount, setGlobalAccount } from '@src/redux/account';
import { useAppSelector } from '@src/redux/hook';
import { selectGlobalNotice, setDetailNotice } from '@src/redux/notice';
import { trimmedDate } from '@src/util/handleTime';
import { firstValidNumber } from '@src/util/util';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ContcatSumaryCard } from '../contactSumaryCard/contactSummaryCard';
import styles from './chatConcatList.module.scss';
import { updateUserInfo } from './handleUpdateUserInfo';

interface ChatConcatProps {
  refreshConcat: number;
}

export function ChatConcatList(props: ChatConcatProps): JSX.Element {
  // const data = new Array(10).fill(0);

  /**
   * 公共区域
   */
  const loginUser = GetTtakLoginUser();
  const globalAccount = useAppSelector(selectGlobalAccount);
  const globalNotice = useAppSelector(selectGlobalNotice);
  const dispatch = useDispatch();

  const { refreshConcat } = props;

  if (loginUser === '') return <></>;

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
        const remark = await readFriendRemark(friendInfo.account);
        list.push({
          account: friendInfo.account,
          avatar: friendInfo.avatar,
          nickname: firstValidNumber([
            remark,
            friendInfo.nickname,
            friendInfo.account
          ]),
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
    void getDataBaseConcatList();

    dispatch(setDetailNotice(''));
  }, [globalAccount, refreshConcat, globalNotice]);

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
