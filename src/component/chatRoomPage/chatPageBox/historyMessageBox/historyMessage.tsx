/* eslint-disable indent */
import { Input } from '@arco-design/web-react';
import { IconClose, IconSearch } from '@arco-design/web-react/icon';
import {
  chat_message_data_entry,
  chat_user_info_entry,
  db
} from '@src/database/db';
import { selectGlobalAccount } from '@src/redux/account';
import { useAppSelector } from '@src/redux/hook';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classnames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import styles from './historyMessage.module.scss';
import { HistoryMessageCard } from './historyMessageCard/historyMessageCard';

interface HistoryMessageBoxprops {
  loginAccount: string;
  nickname: string;
  visible: boolean;
  onClose: () => void;
}

export function HistoryMessageBox(props: HistoryMessageBoxprops): JSX.Element {
  /**
   * 公共区域
   */
  const globalAccount = useAppSelector(selectGlobalAccount);
  const { loginAccount, nickname, onClose, visible } = props;

  // ============================

  const messagesData = useRef<chat_message_data_entry[] | null>(null);
  const friendInfo = useRef<chat_user_info_entry | null>(null);
  const init = (): void => {
    if (globalAccount === '') return;
    db.messageData
      .where({
        friend_account: globalAccount
      })
      .toArray()
      .then((res) => {
        messagesData.current = res;
        // console.log(res);
      })
      .catch((err) => {
        console.log('查找出问题了', err);
      });

    db.userInfoData
      .where({
        account: globalAccount
      })
      .first()
      .then((res) => {
        if (res !== undefined) {
          friendInfo.current = res;
        }

        // console.log(res);
      })
      .catch((err) => {
        console.log('查找出问题了', err);
      });
  };

  /**
   * 点击关掉搜索框
   */
  const [searchShow, setSearchShow] = useState(false);
  const onChangeSearchBox = (): void => {
    setSearchShow(!searchShow);
  };

  useEffect(() => {
    if (globalAccount !== '') {
      init();
    }

    return () => {
      messagesData.current = null;
      friendInfo.current = null;
    };
  }, [globalAccount]);

  const container = classnames({
    [styles.container]: true,
    [styles.close_container]: visible
  });

  const searchBox = classnames({
    [styles.search_box]: true,
    [styles.search_box_show]: searchShow
  });

  // 点击搜索回调
  const onGetSearch = (e: any): void => {
    const { value } = e.target;
    console.log(value);
    db.messageData
      .where({
        friend_account: globalAccount
      })
      .toArray()
      .then((res) => {
        console.table(res[0]);
        messagesData.current = res;
      })
      .catch((err) => {
        console.log('查找出问题了', err);
      });
  };

  return (
    <div className={container}>
      <div className={styles.top_container}>
        <div
          className={styles.search}
          onClick={() => {
            onChangeSearchBox();
          }}
        >
          <IconSearch style={{ fontSize: 20 }} />
        </div>

        <p className={styles.top_title}>历史聊天记录</p>

        <div className={styles.close} onClick={() => onClose()}>
          <IconClose style={{ fontSize: 20, visibility: 'inherit' }} />
        </div>
      </div>

      <section className={searchBox}>
        <Input
          className={styles.search_input}
          allowClear
          placeholder="搜下聊天记录"
          onPressEnter={onGetSearch}
        />
      </section>

      {searchShow ? (
        <div
          className={styles.mask}
          onClick={() => {
            onChangeSearchBox();
          }}
        ></div>
      ) : (
        ''
      )}

      {/* 聊天记录页面 */}
      <section className={styles.message_box}>
        {messagesData.current !== null && friendInfo.current !== null
          ? messagesData.current.map((message, index) => {
              const htmlContent = generateHTML(JSON.parse(message.message), [
                StarterKit,
                TextStyle,
                Color
              ]);

              let userAvatar = friendInfo.current?.avatar;
              let userName = friendInfo.current?.nickname;
              if (message.type === 'send') {
                userAvatar = loginAccount;
                userName = nickname;
              }
              return (
                <HistoryMessageCard
                  key={`${message.remote_id}${index}`}
                  avatarUrl={userAvatar ?? ''}
                  nickname={userName ?? ''}
                  message={htmlContent}
                  time={message.create_time}
                  account={message.friend_account}
                />
              );
            })
          : ''}

        <div style={{ display: 'block', width: '100%', height: '40px' }}></div>
        {/* <HistoryMessageCard
          avatarUrl={''}
          nickname={'d'}
          message={`If you do NOT catch the returned Promise, and an error occur, the transaction will be aborted.

          If you want to log the error but still abort the transaction, you must encapsulate the operation in a transaction() block and catch the transaction instead. It is also possible to catch the operation and call transaction.abort() in the catch() clause.`}
          time={'19:25'}
          account={'ff'}
        />

        <HistoryMessageCard
          avatarUrl={''}
          nickname={'d'}
          message={`If you do NOT catch the returned Promise, and an error occur, the transaction will be aborted.

          If you want to log the error but still abort the transaction, you must encapsulate the operation in a transaction() block and catch the transaction instead. It is also possible to catch the operation and call transaction.abort() in the catch() clause.`}
          time={'2022-11-23 19:25'}
          account={'ff'}
        />

        <HistoryMessageCard
          avatarUrl={''}
          nickname={'d'}
          message={`If you do NOT catch the returned Promise, and an error occur, the transaction will be aborted.

          If you want to log the error but still abort the transaction, you must encapsulate the operation in a transaction() block and catch the transaction instead. It is also possible to catch the operation and call transaction.abort() in the catch() clause.`}
          time={'2022-11-23 19:25'}
          account={'ff'}
        />

        <HistoryMessageCard
          avatarUrl={''}
          nickname={'d'}
          message={`If you do NOT catch the returned Promise, and an error occur, the transaction will be aborted.

          If you want to log the error but still abort the transaction, you must encapsulate the operation in a transaction() block and catch the transaction instead. It is also possible to catch the operation and call transaction.abort() in the catch() clause.`}
          time={'2022-11-23 19:25'}
          account={'ff'}
        /> */}
      </section>
    </div>
  );
}
