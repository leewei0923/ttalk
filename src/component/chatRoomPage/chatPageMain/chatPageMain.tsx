import { db } from '@src/database/db';
import { getUserInfo } from '@src/database/getUserInfo';
import { selectGlobalAccount } from '@src/redux/account';
import { useAppSelector } from '@src/redux/hook';
import { firstValidNumber } from '@src/util/util';
import React, { useEffect, useState } from 'react';
import { ChatConcatList } from '../chatConcatList/chatConcatList';
import { ExpandChatBox } from '../chatInputBox/chatExpandChatBox/chatExpandChatBox';
import { ChatInputBox } from '../chatInputBox/chatInputBox';
import { ChatPageBox } from '../chatPageBox/chatPageBox';
import { ContactPageTopBar } from '../contactPageTopBar/contactPageTopBar';
import logoTransparent from '@pic/pic/logo_transparent.png';
import dayjs from 'dayjs';
import styles from './chatPageMain.module.scss';
import { JSONContent } from '@tiptap/react';
import { GetTtakLoginUser } from '@src/common/personInfo';
import {
  HandleChat,
  MessageData,
  MessageDetailData
} from '@src/util/handleChat';
import { chatData } from '../chatPageBox/data';

export function ChatPageMain(): JSX.Element {
  /**
   * 公共区域
   */
  const globalAccount = useAppSelector(selectGlobalAccount);
  const loginUserInfo = GetTtakLoginUser();
  const handleChat = new HandleChat();

  /**
   * 初始渲染
   */
  const [chatDatas, setChatDatas] = useState<MessageData[] | ''>();
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

  const [refresh, setRefresh] = useState(1);
  const onSubmit = (content: JSONContent): void => {
    const curDate = dayjs().format('YYYY-MM-DD HH:mm');

    const message: MessageDetailData = {
      remote_id: '4',
      user_account: loginUserInfo !== '' ? loginUserInfo[0].account : '',
      friend_account: globalAccount,
      mood_state: '开心',
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

    setRefresh(refresh + 1);
    setChatDatas(insertRes);
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

  const [friendvatar, setFriendAvatar] = useState('');
  function loadUserIndo(): void {
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

  useEffect(() => {
    void getFriendInfo();

    if (friendvatar === '') {
      loadUserIndo();
    }

    if (globalAccount !== '' && chatDatas === '') {
      init(globalAccount);
    }
  }, [globalAccount, friendvatar, refresh]);

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
          <ContactPageTopBar nickname={friendName} />
          <ChatPageBox
            // messageData={chatDatas ?? []}
            messageData={chatData ?? []}
            
            avatar={friendvatar}
            avatarString={friendName}
          />
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
      </section>
    </div>
  );
}
