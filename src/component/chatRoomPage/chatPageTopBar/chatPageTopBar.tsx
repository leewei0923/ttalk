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
  const onSubmitApply = async (value: {
    remark: string;
    verifyInformation: string;
  }): Promise<void> => {
    setShowApplyHide(true);
    const userAccount = userInfo[0].account;
    const friendAccount = searchRef.current?.value ?? '';

    const res = await apiAddFriend({
      user_account: userAccount,
      friend_account: friendAccount,
      friend_flag: true,
      verifyInformation: value.verifyInformation,
      remark: value.remark,
      blacklist: false,
      tags: '',
      type: 'apply'
    });

    socket.emit('addFriend', {
      type: 'apply',
      user_account: userAccount,
      friend_account: friendAccount
    });
    console.log(res);
  };

  useEffect(() => {
    socket.on('addFriend', function (res: any) {
      console.log(res);
      if (res.type === 'apply') {
        ChatNotification({
          control: {
            title: '添加好友消息',
            content: `${res.friend_account}添加你为好友`
          }
        });
      }
    });

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
