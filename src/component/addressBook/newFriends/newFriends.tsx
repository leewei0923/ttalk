/* eslint-disable indent */
/* eslint-disable react/jsx-key */
import { db } from '@src/database/db';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import styles from './newFriend.module.scss';
import { NewFriendsCard } from './newFriendCard/newFriendCard';
import Storage from '@src/util/localStorage';
import { userInfoType } from '@src/types';
import { apiAddFriend } from '@src/api/user';
import { useSocket } from '@src/contexts/socket';
import { Input, Modal } from '@arco-design/web-react';
import { RefInputType } from '@arco-design/web-react/es/Input/interface';

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
  const socket = useSocket();
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

  /**
   * 收到好友申请,点击同意
   */
  const [modelVisible, setModelVisible] = useState(false);
  const [friendAccount, setFriendAccount] = useState('');
  const remarkRef = useRef<RefInputType>(null);
  const onAddFriend = (): void => {
    const curDate = dayjs().format('YYYY-MM-DD HH:mm');
    const remark = remarkRef.current?.dom.value ?? '';
    apiAddFriend({
      user_account: userInfo[0].account,
      friend_account: friendAccount,
      verifyInformation: '',
      remark,
      blacklist: false,
      tags: '',
      type: 'accept'
    })
      .then((res) => {
        db.friends
          .add({
            remote_id: '',
            user_account: userInfo[0].account,
            friend_account: friendAccount,
            add_time: curDate,
            update_time: curDate,
            friend_flag: true,
            verifyInformation: '',
            remark,
            blacklist: false,
            tags: '',
            type: 'accept',
            ip: ''
          })
          .catch((err) => {
            console.log('同意好友信息失败', err);
          });

        // 更新申请人表信息
        db.friends
          .where({
            user_account: friendAccount
          })
          .modify({ friend_flag: true, update_time: curDate })
          .catch((err) => {
            console.log('更新friends出错', err);
          });

        // 与服务器交流同时通知对方添加成功
        socket.emit('addFriend', {
          type: 'accept',
          user_account: userInfo[0].account,
          friend_account: friendAccount
        });

        setModelVisible(false);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    void getDataBase();

    return () => {
      // 页面卸载后移除socket监听
      socket.off('addFriend');
    };
  }, [socket]);

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
                onClickAdd={function (account: string) {
                  setFriendAccount(account);
                  setModelVisible(true);
                }}
              />
            );
          })
        : ''}

      <Modal
        title="添加备注"
        visible={modelVisible}
        onOk={() => onAddFriend()}
        onCancel={() => setModelVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <Input
          ref={remarkRef}
          maxLength={30}
          showWordLimit
          allowClear
          placeholder="备注"
        />
      </Modal>
    </div>
  );
}
