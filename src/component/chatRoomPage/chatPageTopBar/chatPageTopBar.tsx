/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { IconPlus, IconSearch } from '@arco-design/web-react/icon';
import { apiAddFriend, apiSearchUser } from '@src/api/user';
import { useSocket } from '@src/contexts/socket';
import { db } from '@src/database/db';
import classnames from 'classnames';
import Storage from '@src/util/localStorage';
import React, { useEffect, useRef, useState } from 'react';
import { AddUser } from './addUser/addUser';
import styles from './chatPage.module.scss';
import { UserCard } from './userCard/userCard';
import { userInfoType } from '@src/types';
import { ChatNotification } from '@src/component/message/notification';
import { Message } from '@arco-design/web-react';

export function ChatPageTopBar(): JSX.Element {
  /**
   * 公共区域
   */
  const localStorage = new Storage();
  const socket = useSocket();
  const userInfo: userInfoType[] = JSON.parse(
    localStorage.getStorage('chat-user-info')
  );

  // ==================
  const [addBoxFlag, setAddBoxFlag] = useState(false); // 隐藏申请框

  const ClassNames = {
    concat_search: classnames({
      [styles.concat_search]: true,
      [styles.concat_search_close]: addBoxFlag
    })
  };

  /**
   * 搜索用户
   */
  interface searchRes {
    account: string;
    motto: string;
    nickname: string;
    avatar: string;
  }
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchUser, setSearchUser] = useState<searchRes | 'null'>();
  const [buttonState, setButtonState] = useState<'new' | 'friend'>('new');
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSearchUser = async () => {
    const searchVal = searchRef.current?.value;
    const searchRes = await apiSearchUser({ account: searchVal ?? '' });

    if (searchRes.code === 200) {
      if (typeof searchRes.user === 'object') {
        const tables = await db.friends
          .where({
            friend_account: searchVal
          })
          .toArray();
        if (tables.length <= 0) {
          setButtonState('new');
        } else {
          setButtonState('friend');
        }
        setSearchUser(searchRes.user[0]);
      } else {
        setSearchUser('null');
      }
    }
  };
  // ================

  // 点击添加
  const [showApplyHide, setShowApplyHide] = useState(true);

  const onAddUser = (): void => {
    setShowApplyHide(false);
  };

  const onSendMessage = (): void => {};

  /**
   * 获取申请信息
   */
  const onSubmitApply = (value: {
    remark: string;
    verifyInformation: string;
  }): void => {
    setShowApplyHide(true);
    const userAccount = userInfo[0].account;
    const friendAccount = searchRef.current?.value ?? '';

    apiAddFriend({
      user_account: userAccount,
      friend_account: friendAccount,
      friend_flag: true,
      verifyInformation: value.verifyInformation,
      remark: value.remark,
      blacklist: false,
      tags: '',
      type: 'apply'
    })
      .then((res) => {
        if (res.code === 200) {
          socket.emit('addFriend', {
            type: 'apply',
            user_account: userAccount,
            friend_account: friendAccount
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Message.error('添加出错');
      });
  };

  /**
   * 处理监听事件
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onListenAddFriend = () => {
    socket.on('addFriend', async function (res: any) {
      if (res.type === 'apply') {
        const {
          id,
          user_account: userAccount,
          friend_account: friendAccount,
          add_time: addTime,
          update_time: updateTime,
          friend_flag: friendFlag,
          verifyInformation,
          remark,
          blacklist,
          tags,
          ip
        } = res.friends;

        const {
          id: userId,
          social,
          nickname,
          motto,
          account,
          avatar,
          bird_date: birdDate
        } = res.user;

        console.log(res);

        // return;

        try {
          // 获取数据
          // 用户的基本信息

          const friendsInfoData = await db.userInfoData
            .where({
              account: userAccount
            })
            .toArray();

          // 用户的请求信息
          const friendSData = await db.userInfoData
            .where({
              account: userAccount
            })
            .toArray();
          // 判断是否存在，存在就更新，否则添加
          if (friendSData.length <= 0) {
            await db.friends.add({
              id,
              user_account: userAccount,
              friend_account: friendAccount,
              add_time: addTime,
              update_time: updateTime,
              friend_flag: friendFlag,
              verifyInformation,
              remark,
              blacklist,
              tags,
              ip
            });
          } else {
            console.log(1);
            await db.friends.put({
              id,
              user_account: userAccount,
              friend_account: friendAccount,
              add_time: addTime,
              update_time: updateTime,
              friend_flag: friendFlag,
              verifyInformation,
              remark,
              blacklist,
              tags,
              ip
            });
          }

          if (friendsInfoData.length <= 0) {
            await db.userInfoData.add({
              id: userId,
              social: social ?? '',
              nickname: nickname ?? '',
              motto: motto ?? '',
              account: account ?? '',
              avatar: avatar ?? '',
              bird_date: birdDate ?? ''
            });
          } else {
            console.log(2);
            await db.userInfoData.put({
              id: userId,
              social: social ?? '',
              nickname: nickname ?? '',
              motto: motto ?? '',
              account: account ?? '',
              avatar: avatar ?? '',
              bird_date: birdDate ?? ''
            });
          }

          ChatNotification({
            control: {
              title: '添加好友消息',
              content: `${userAccount}添加你为好友`
            }
          });
        } catch (error) {
          console.log('error: ', error);
        }
      }
    });
  };

  useEffect(() => {
    // 监听添加好友
    onListenAddFriend();

    return () => {
      // 页面卸载后移除socket监听
      socket.off();
    };
  }, [socket]);

  return (
    <div className={styles.container}>
      <div className={ClassNames.concat_search}>
        <div className={styles.concat_search_box}>
          <input
            className={styles.add_search_box}
            placeholder="请输入对方账号或昵称搜索"
            ref={searchRef}
          />
          <button
            className={styles.add_search_btn}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => await onSearchUser()}
          >
            搜索
          </button>
        </div>

        {searchUser === 'null' ? (
          <div>无效的用户名</div>
        ) : (
          <UserCard
            motto={searchUser?.motto}
            nickname={searchUser?.nickname}
            avatar={searchUser?.avatar}
            account={searchUser?.account}
            onAddUser={onAddUser}
            onSendMessage={onSendMessage}
            hide={searchUser === undefined}
            buttonState={buttonState}
          />
        )}
      </div>

      <AddUser
        hide={showApplyHide}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={onSubmitApply}
        onHideMode={() => {
          setShowApplyHide(true);
        }}
      />

      {/* 搜索框 */}
      <div className={styles.search_box}>
        <div className={styles.search_input_box}>
          <input
            type="text"
            name="search_text"
            className={styles.search_text_input}
          />
          <div className={styles.icon_search}>
            <IconSearch style={{ width: '24px' }} />
            <p>搜索</p>
          </div>
        </div>

        <div
          className={styles.plus_btn_box}
          onClick={() => setAddBoxFlag(!addBoxFlag)}
        >
          <IconPlus
            style={{ width: '25px', strokeWidth: '3px', color: 'white' }}
          />
        </div>
      </div>
    </div>
  );
}
