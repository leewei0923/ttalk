/* eslint-disable indent */
import { db } from '@src/database/db';
import { getUserInfo } from '@src/database/getUserInfo';
import { selectGlobalAccount } from '@src/redux/account';
import { useAppSelector } from '@src/redux/hook';
import { firstValidNumber } from '@src/util/util';
import React, { useEffect, useRef, useState } from 'react';
import { ChatConcatList } from '../chatConcatList/chatConcatList';
import { ExpandChatBox } from '../chatInputBox/chatExpandChatBox/chatExpandChatBox';
import { ChatInputBox } from '../chatInputBox/chatInputBox';
import { ChatPageBox } from '../chatPageBox/chatPageBox';
import { ContactPageTopBar } from '../contactPageTopBar/contactPageTopBar';
import logoTransparent from '@pic/pic/logo_transparent.png';
import dayjs from 'dayjs';
import styles from './chatPageMain.module.scss';
import { JSONContent } from '@tiptap/react';
import { GetTtakLoginUser, GetTtakMood } from '@src/common/personInfo';
import {
  HandleChat,
  MessageData,
  MessageDetailData
} from '@src/util/handleChat';
import { useSocket } from '@src/contexts/socket';
import { selectGlobalNotice, setDetailNotice } from '@src/redux/notice';
import { useDispatch } from 'react-redux';
import { FriendSetting } from '../chatPageBox/friendSetting/friendSetting';
import { HistoryMessageBox } from '../chatPageBox/historyMessageBox/historyMessage';
// import { chatData } from '../chatPageBox/data';

export function ChatPageMain(): JSX.Element {
  /**
   * 公共区域
   */
  const globalAccount = useAppSelector(selectGlobalAccount);
  const globalNotice = useAppSelector(selectGlobalNotice);
  const dispatch = useDispatch();
  const loginUserInfo = GetTtakLoginUser();
  const handleChat = new HandleChat();
  const socket = useSocket();

  /**
   * 初始渲染
   */
  const [chatDatas, setChatDatas] = useState<MessageData[] | ''>('');
  function init(account: string): void {
    handleChat
      .create(account)
      .then((res) => {
        if (res !== '') {
          setChatDatas(res);
        }
      })
      .catch((err) => {
        console.log('加载出错', err);
      });
  }

  /**
   * 扩充面板
   */
  const [expandChatBox, setExpandChatBox] = useState(false);
  function changeExpandInput(): void {
    setExpandChatBox(!expandChatBox);
  }

  // ===========================

  /**
   * 提交聊天框里的信息
   */

  const [refresh, setRefresh] = useState(1); // 供刷新使用
  const [pageBoxCorr, setPageBoxCorr] = useState('');
  const onSubmit = (content: JSONContent): void => {
    const moodOptions = GetTtakMood();
    let moodState: string = '';
    const curTime = Date.now();

    if (typeof moodOptions === 'object') {
      if (curTime > parseInt(moodOptions.expireTime)) {
        moodState = 'normal';
      } else {
        moodState = moodOptions.type;
      }
    }

    const curDate = dayjs().format('YYYY-MM-DD HH:mm');

    const message: MessageDetailData = {
      remote_id: 'local',
      user_account: loginUserInfo !== '' ? loginUserInfo[0].account : '',
      friend_account: globalAccount,
      mood_state: moodState,
      type: 'send',
      message_style: 'normal',
      message: JSON.stringify(content),
      read_flag: false,
      create_time: curDate,
      update_time: curDate
    };

    const insertRes = handleChat.insert(
      Array.isArray(chatDatas) ? chatDatas : '',
      message,
      'push'
    );

    handleChat.addDb(message);

    /**
     * 与服务器通讯
     */
    socket.emit('messaging', {
      user_account: loginUserInfo !== '' ? loginUserInfo[0].account : '',
      friend_account: globalAccount,
      message: JSON.stringify(content),
      mood_state: moodState,
      message_style: 'normal',
      read_flag: false
    });

    setRefresh(refresh + 1);
    setChatDatas(insertRes);
    setPageBoxCorr('send');
  };

  /**
   * 获取聊天对象的信息
   */
  const [friendName, setFriendName] = useState('');
  const getFriendInfo = async (): Promise<void> => {
    if (loginUserInfo !== '' && globalAccount === loginUserInfo[0].account) {
      setFriendName(
        firstValidNumber<string>([
          loginUserInfo[0].nickname,
          loginUserInfo[0].account
        ])
      );
    } else if (globalAccount !== '') {
      const userInfo = await getUserInfo(globalAccount);
      const friendsRes = await db.friends
        .where({
          friend_account: globalAccount
        })
        .first();

      if (friendsRes === undefined && userInfo === undefined) {
        return;
      }
      setFriendName(
        firstValidNumber<string>([
          friendsRes?.remark ?? '',
          userInfo?.nickname ?? '',
          userInfo?.account ?? ''
        ])
      );
    }
  };

  const [friendavatar, setFriendAvatar] = useState('');
  function loadUserInfo(): void {
    if (loginUserInfo !== '' && loginUserInfo[0].account === globalAccount) {
      setFriendAvatar(loginUserInfo[0].avatar);
    } else if (globalAccount !== '') {
      getUserInfo(globalAccount)
        .then((res) => {
          setFriendAvatar(res?.avatar ?? '');
        })
        .catch((res) => console.log('出错'));
    }
  }

  const saveAccountRef = useRef('');
  const onAccountChange = (account: string): void => {
    saveAccountRef.current = account;
    handleChat
      .loadMessage(account)
      .then((res) => {
        setChatDatas(res);
      })
      .catch((err) => {
        console.log('加载出错', err);
      });
  };

  /**
   * correspond
   */
  const onChangeCorrespond = (sign: string): void => {
    setPageBoxCorr(sign);
  };

  /**
   * 加载历史消息
   */
  const onfetchHistory = (): void => {
    if (typeof chatDatas === 'object') {
      const chats = chatDatas;
      handleChat
        .loadHistoryMessages(
          globalAccount,
          chats[0].children[0].create_time,
          chatDatas
        )
        .then((res) => {
          setChatDatas(res);
          setRefresh(refresh + 1);
        })
        .catch((err) => {
          console.log('出错了', err);
        });
    }
  };

  /**
   * 接收新消息添加
   */

  const onReceiveMessage = (): void => {
    if (typeof globalNotice !== 'object') return;

    const {
      name,
      friend_account: friendAccount,
      remote_id: remoteId
    } = globalNotice;
    if (globalAccount !== friendAccount || name !== 'receive') return;

    db.messageData
      .where({
        remote_id: remoteId
      })
      .first()
      .then((messRes) => {
        if (typeof messRes === 'undefined') return;

        const insertRes = handleChat.insert(
          Array.isArray(chatDatas) ? chatDatas : '',
          messRes,
          'push'
        );

        setRefresh(refresh + 1);
        setChatDatas(insertRes);
        setPageBoxCorr('send');
        dispatch(setDetailNotice(''));
      })
      .catch((err) => {
        console.log('出现错误', err);
      });
  };

  // 控制好友设置页面的显示与隐藏
  const [showFriendFlag, setShowFriendFlg] = useState(false);
  function changeFriendVisible(): void {
    setShowFriendFlg(!showFriendFlag);
  }

  /**
   * 控制历史记录显示与隐藏
   */
  const [historyShow, setHistoryShow] = useState(false);
  const changeHistoryVisible = (): void => {
    setHistoryShow(!historyShow);
  };

  useEffect(() => {
    void getFriendInfo();

    if (friendavatar === '') {
      loadUserInfo();
    }
    if (saveAccountRef.current !== globalAccount) {
      onAccountChange(globalAccount);
    }

    if (globalAccount !== '' && chatDatas === '') {
      init(globalAccount);
    }

    onReceiveMessage(); // 接收消息

    return () => {};
  }, [globalAccount, friendavatar, refresh, socket, globalNotice]);

  return (
    <div className={styles.container}>
      <section className={styles.external_container}>
        {/* 联系人展示区域 */}

        <div className={styles.contact_box}>
          <ChatConcatList />
        </div>

        <section
          className={styles.chat_page_container}
          style={{ display: globalAccount === '' ? 'none' : '' }}
        >
          <ContactPageTopBar
            nickname={friendName}
            settingClick={changeFriendVisible}
            setHistoryClick={changeHistoryVisible}
          />

          {globalAccount === '' ? (
            ''
          ) : (
            <ChatPageBox
              messageData={chatDatas}
              // messageData={chatData ?? []}
              loginAvatar={
                loginUserInfo !== ''
                  ? firstValidNumber([
                      loginUserInfo[0].avatar,
                      loginUserInfo[0].nickname,
                      loginUserInfo[0].account
                    ])
                  : ''
              }
              avatar={
                loginUserInfo !== ''
                  ? firstValidNumber([friendavatar, friendName])
                  : ''
              }
              correspond={pageBoxCorr}
              setCorrespond={onChangeCorrespond}
              fetchHistory={onfetchHistory}
            />
          )}

          {expandChatBox ? (
            <ExpandChatBox
              expandSwitch={changeExpandInput}
              onSubmit={onSubmit}
            />
          ) : (
            <ChatInputBox
              expandSwitch={changeExpandInput}
              onSubmit={onSubmit}
            />
          )}
        </section>

        <div
          className={styles.blank_page_container}
          style={{ display: globalAccount === '' ? 'flex' : 'none' }}
        >
          <img src={logoTransparent} className={styles.logo} />
          <p>TTalk 想聊就聊</p>
        </div>

        {/* 好友菜单页面 */}

        {globalAccount === '' ? (
          ''
        ) : (
          <FriendSetting
            loginAccount={(() => {
              if (typeof loginUserInfo === 'object') {
                return loginUserInfo[0].account;
              } else {
                return '';
              }
            })()}
            visibleFlag={showFriendFlag}
            setVisibleFlag={changeFriendVisible}
          />
        )}

        {/* 历史记录页面 */}
        <HistoryMessageBox
          loginAccount={
            loginUserInfo !== ''
              ? firstValidNumber([
                  loginUserInfo[0].avatar,
                  loginUserInfo[0].nickname,
                  loginUserInfo[0].account
                ])
              : ''
          }
          nickname={loginUserInfo !== '' ? loginUserInfo[0].nickname : ''}
          visible={historyShow}
          onClose={changeHistoryVisible}
        />
      </section>
    </div>
  );
}
