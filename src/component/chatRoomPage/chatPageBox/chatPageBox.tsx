/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useRef, useState } from 'react';
import { ChatCard } from './chatCard/chatCard';
// import { chatData } from './data';
import styles from './chatPageBox.module.scss';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { MessageData, MessageDetailData } from '@src/util/handleChat';
import useDebounce from '@src/hooks/debounce';
import { IconClose } from '@arco-design/web-react/icon';
import { useSocket } from '@src/contexts/socket';
import { messageFeedbackDB } from '../chatPageMain/handleScoket';

interface ChatPageBoxProps {
  messageData: MessageData[] | '';
  avatar: string;
  loginAvatar: string;
  fetchHistory: () => void;
  correspond?: string;
  setCorrespond?: (sign: string) => void;
  loginAccount: string;
  friendAccount: string;
}

export function ChatPageBox(props: ChatPageBoxProps): JSX.Element {
  const {
    messageData,
    avatar,
    correspond,
    setCorrespond,
    fetchHistory,
    loginAvatar,
    loginAccount,
    friendAccount
  } = props;

  const [lodingFlag, setLodingFlag] = useState(false);
  const socket = useSocket();
  // ======================

  // 滚轮滑动事件
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const historyHeightRef = useRef<number>(0);
  function scrollToBottom(correspond: string | undefined): void {
    if (chatBoxRef.current === null) return;

    const currentHeight = chatBoxRef.current.scrollHeight;

    if (correspond === undefined || correspond === '') {
      chatBoxRef.current.scrollTo({
        left: 0,
        top: currentHeight ?? 10000,
        behavior: 'smooth'
      });
    } else if (correspond === 'send') {
      chatBoxRef.current.scrollTo({
        left: 0,
        top: currentHeight + 200 ?? 10000,
        behavior: 'smooth'
      });
    } else if (correspond === 'history') {
      if (currentHeight === historyHeightRef.current) return; // 滑到未读消息处,两者之间的差值就是用户自己滑动的距离

      chatBoxRef.current.scrollTo({
        left: 0,
        top: currentHeight - historyHeightRef.current,
        behavior: 'smooth'
      });

      historyHeightRef.current = currentHeight;
    }
  }
  scrollToBottom(correspond);

  // 上拉加载历史数据
  const chatLodingRef = useRef<HTMLDivElement>(null);
  const [scrollRendHandle] = useDebounce(
    (): void => {
      if (chatLodingRef.current === null) return;

      if (chatBoxRef.current?.scrollTop === 0) {
        setLodingFlag(true);
        if (typeof setCorrespond === 'function') {
          setCorrespond('loding');
        }
      }
    },
    500,
    []
  );

  const onCardRead = (messageId: string, message: MessageDetailData): void => {
    // 阅读后发个信息给friend_account, 通知对方已经阅读了

    if (message.friend_account !== loginAccount && message.type === 'receive') {
      socket.emit('read', {
        send_account: loginAccount,
        receive_account: friendAccount,
        remote_id: messageId
      });
    }
    messageFeedbackDB({
      user_account: loginAccount,
      friend_account: friendAccount,
      message_ids: messageId
    });
  };

  useEffect(() => {
    document.addEventListener('wheel', scrollRendHandle);

    return () => {
      document.removeEventListener('wheel', scrollRendHandle);
      // console.log(chatLodingRef, lodingFlag);
    };
  }, []);

  if (messageData === '') {
    return <>暂时没有数据</>;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.loding}
        style={{ visibility: lodingFlag ? 'visible' : 'hidden' }}
        ref={chatLodingRef}
      >
        <p
          onClick={() => {
            if (
              typeof fetchHistory === 'function' &&
              setCorrespond !== undefined
            ) {
              fetchHistory();
              setCorrespond('history');
              setLodingFlag(false);
            }
          }}
        >
          点击加载更多
        </p>

        <div
          className={styles.loding_close}
          onClick={() => {
            setLodingFlag(false);
          }}
        >
          <IconClose style={{ fontSize: 16 }} />
        </div>
      </div>

      <div className={styles.wraper_chat} ref={chatBoxRef}>
        {messageData.map((item): any => {
          return (
            <div key={item.date} className={styles.chat_content_container}>
              <p className={styles.date_text}>{item.date}</p>
              {item.children.map((item2, index2) => {
                const htmlContent = generateHTML(JSON.parse(item2.message), [
                  StarterKit,
                  TextStyle,
                  Color
                ]);

                let userAvatar = avatar;
                if (item2.type === 'send') {
                  userAvatar = loginAvatar;
                }

                return (
                  <ChatCard
                    message={item2}
                    key={item2.friend_account + index2.toString()}
                    remoteId={item2.remote_id}
                    content={htmlContent}
                    time={item2.create_time}
                    avatar={userAvatar}
                    type={item2.type}
                    flag={item2.read_flag}
                    onRead={onCardRead}
                  />
                );
              })}
            </div>
          );
        })}
        <div style={{ display: 'block', width: '100%', height: '80px' }}></div>
      </div>
    </div>
  );
}
