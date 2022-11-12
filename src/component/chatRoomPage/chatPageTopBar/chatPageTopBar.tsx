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
import dayjs from 'dayjs';

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

    // 先判断是不是自己账号
    if (searchVal === userInfo[0].account) {
      setButtonState('friend');
      const user = {
        account: userInfo[0].account,
        motto: userInfo[0].motto,
        nickname: userInfo[0].nickname ?? '',
        avatar: userInfo[0].avatar ?? ''
      };
      setSearchUser(user);
      return;
    }

    // 再在自己的数据库中查找
    let contineFlag = true;

    db.friends
      .where({
        friend_account: searchVal
      })
      .toArray()
      .then(async (res) => {
        if(res.length === 0) {
          setButtonState('new');
          return;
        }

        const { friend_account: friendAccount } = res[0];

        const friendInfo = await db.userInfoData
          .where({
            account: friendAccount
          })
          .toArray();

        if (friendInfo.length > 0) {
          setSearchUser({
            account: friendInfo[0].account,
            motto: friendInfo[0].motto,
            nickname: friendInfo[0].nickname ?? '',
            avatar: friendInfo[0].avatar ?? ''
          });
          contineFlag = false;
        } else {
          contineFlag = true;
        }

        setButtonState('friend');
      })
      .catch((err) => {
        console.log('查找用户信息出错', err);
      });

    if (!contineFlag) return;

    // 再在网络查找
    const searchRes = await apiSearchUser({ account: searchVal ?? '' });
    if (searchRes.code === 200) {
      if (typeof searchRes.user === 'object') {
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
    const curDate = dayjs().format('YYYY-MM-DD HH:mm');
    const userAccount = userInfo[0].account;
    const friendAccount = searchRef.current?.value ?? '';

    apiAddFriend({
      user_account: userAccount,
      friend_account: friendAccount,
      verifyInformation: value.verifyInformation ?? '',
      remark: value.remark ?? '',
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

          db.friends
            .add({
              remote_id: '',
              user_account: userInfo[0].account,
              friend_account: friendAccount,
              add_time: curDate,
              update_time: curDate,
              friend_flag: false,
              verifyInformation: '',
              remark: value.remark,
              blacklist: false,
              tags: '',
              type: 'accept',
              ip: ''
            })
            .catch((err) => {
              console.log('添加好友失败', err);
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
      console.log(res);
      // apply 下 user_account是对方账号, friend_account 与登录的账号相同
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

        // return;

        // 获取数据
        // 用户的基本信息

        const friendsInfoData = await db.userInfoData
          .where({
            account: userAccount
          })
          .toArray();

        // 申请添加好友的信息
        const friendSData = await db.friends
          .where({
            user_account: userAccount
          })
          .toArray();

        // 判断是否存在，存在就更新，否则添加
        if (friendSData.length <= 0) {
          db.friends
            .add({
              // id,
              remote_id: id,
              user_account: userAccount,
              friend_account: friendAccount,
              add_time: addTime,
              update_time: updateTime,
              friend_flag: friendFlag,
              verifyInformation,
              remark,
              blacklist,
              tags,
              ip,
              type: 'apply'
            })
            .catch((err) => {
              console.log('好友列表添加失败', err);
            });
        } else {
          db.friends
            .put({
              // id,
              remote_id: id,
              user_account: userAccount,
              friend_account: friendAccount,
              add_time: addTime,
              update_time: updateTime,
              friend_flag: friendFlag,
              verifyInformation,
              remark,
              blacklist,
              tags,
              ip,
              type: 'apply'
            })
            .catch((err) => {
              console.log('好友列表更新失败', err);
            });
        }

        if (friendsInfoData.length <= 0) {
          db.userInfoData
            .add({
              // id: userId,
              remote_id: userId,
              social: social ?? '',
              nickname: nickname ?? '',
              motto: motto ?? '',
              account: account ?? '',
              avatar: avatar ?? '',
              bird_date: birdDate ?? ''
            })
            .catch((err) => {
              console.log('用户信息添加失败', err);
            });
        } else {
          await db.userInfoData
            .put({
              // id: userId,
              remote_id: userId,
              social: social ?? '',
              nickname: nickname ?? '',
              motto: motto ?? '',
              account: account ?? '',
              avatar: avatar ?? '',
              bird_date: birdDate ?? ''
            })
            .catch((err) => {
              console.log('用户信息更新失败', err);
            });
        }

        ChatNotification({
          control: {
            title: '添加好友消息',
            content: `${userAccount}添加你为好友`
          }
        });
      }

      if (res.type === 'accept') {
        void onAcceptFriend(res);
      }
    });
  };

  // 收到通知

  const onAcceptFriend = async (res: any): Promise<void> => {
    const { friend_account: friendAccount } = res.friends;

    const {
      id: userId,
      social,
      nickname,
      motto,
      account,
      avatar,
      bird_date: birdDate
    } = res.user;

    const curDate = dayjs().format('YYYY-MM-DD HH:mm');

    // 更新申请人表信息
    db.friends
      .where({
        user_account: userInfo[0].account
      })
      .modify({ friend_flag: true, update_time: curDate })
      .catch((err) => {
        console.log('更新friends出错', err);
      });

    // 用户的基本信息
    // 添加对方个人信息到已方的信息库中

    const friendsInfoData = await db.userInfoData
      .where({
        account: friendAccount
      })
      .toArray();

    if (friendsInfoData.length <= 0) {
      db.userInfoData
        .add({
          // id: userId,
          remote_id: userId,
          social: social ?? '',
          nickname: nickname ?? '',
          motto: motto ?? '',
          account: account ?? '',
          avatar: avatar ?? '',
          bird_date: birdDate ?? ''
        })
        .catch((err) => {
          console.log('添加好友信息失败', err);
        });
    } else {
      await db.userInfoData
        .put({
          // id: userId,
          remote_id: userId,
          social: social ?? '',
          nickname: nickname ?? '',
          motto: motto ?? '',
          account: account ?? '',
          avatar: avatar ?? '',
          bird_date: birdDate ?? ''
        })
        .catch((err) => {
          console.log('更新好友信息失败', err);
        });
    }

    ChatNotification({
      control: {
        title: '添加好友消息',
        content: `${friendAccount}已经添加你为好友`
      }
    });
  };

  // ====================

  useEffect(() => {
    // 监听添加好友
    onListenAddFriend();

    return () => {
      // 页面卸载后移除socket监听
      socket.off('addFriend');
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

        {/* 展示搜索栏的信息  */}
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
