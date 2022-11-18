import { db } from '@src/database/db';
import { getUserInfo } from '@src/database/getUserInfo';
import { selectGlobalAccount } from '@src/redux/account';
import { useAppSelector } from '@src/redux/hook';
import { ContentParser } from '@src/util/inputParser';
import { firstValidNumber } from '@src/util/util';
import React, { useEffect, useState } from 'react';
import { ChatConcatList } from '../chatConcatList/chatConcatList';
import { ExpandChatBox } from '../chatInputBox/chatExpandChatBox/chatExpandChatBox';
import { ChatInputBox } from '../chatInputBox/chatInputBox';
import { ChatPageBox } from '../chatPageBox/chatPageBox';
import { ContactPageTopBar } from '../contactPageTopBar/contactPageTopBar';
import logoTransparent from '@pic/pic/logo_transparent.png';

import styles from './chatPageMain.module.scss';

export function ChatPageMain(): JSX.Element {
  /**
   * 公共区域
   */
  const contentParser = new ContentParser();
  const globalAccount = useAppSelector(selectGlobalAccount);

  /**
   * 扩充面板
   */
  const [expandChatBox, setExpandChatBox] = useState(false);
  function changeExpandInput(): void {
    setExpandChatBox(!expandChatBox);
  }

  // ===========================

  /**
   * 提交按钮
   */
  const onSubmit = (content: string): void => {
    // console.log('content: ', content);
    console.log(contentParser.parser(content));
    // console.log('content: ', content.split('\n'));
  };

  /**
   * 获取聊天对象的信息
   */
  const [friendInfo, setFriendInfo] = useState('');
  const getFriendInfo = async (): Promise<void> => {
    if (globalAccount !== '') {
      const userInfo = await getUserInfo(globalAccount);
      const friendsRes = await db.friends
        .where({
          friend_account: globalAccount
        })
        .first();

      if (friendsRes === undefined && userInfo === undefined) {
        return;
      }
      setFriendInfo(
        firstValidNumber<string>([
          friendsRes?.remark ?? '',
          userInfo?.nickname ?? '',
          userInfo?.account ?? ''
        ])
      );
    }
  };

  useEffect(() => {
    void getFriendInfo();
  }, [globalAccount]);

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
          <ContactPageTopBar nickname={friendInfo} />
          <ChatPageBox />
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

        <div className={styles.blank_page_container} style={{ display: globalAccount === '' ? 'flex' : 'none' }}>
          <img src={logoTransparent} className={styles.logo} />
          <p>TTalk 想聊就聊</p>
        </div>
      </section>
    </div>
  );
}
