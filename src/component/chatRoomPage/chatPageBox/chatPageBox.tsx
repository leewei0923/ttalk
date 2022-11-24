import React, { useEffect, useRef, useState } from 'react';
import { ChatCard } from './chatCard/chatCard';
// import { chatData } from './data';
import styles from './chatPageBox.module.scss';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { MessageData } from '@src/util/handleChat';
import useDebounce from '@src/hooks/debounce';

interface ChatPageBoxProps {
  messageData: MessageData[] | '';
  avatar: string;
  avatarString: string;
  fetchHistory: () => void;
  correspond?: string;
  setCorrespond?: (sign: string) => void;
}

export function ChatPageBox(props: ChatPageBoxProps): JSX.Element {
  const {
    messageData,
    avatar,
    avatarString,
    correspond,
    setCorrespond,
    fetchHistory
  } = props;

  const [lodingFlag, setLodingFlag] = useState(false);
  // ======================

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
      console.log('未定义');
    } else if (correspond === 'send') {
      chatBoxRef.current.scrollTo({
        left: 0,
        top: currentHeight + 200 ?? 10000,
        behavior: 'smooth'
      });
      console.log('发信息');
    } else if (correspond === 'history') {
      if (currentHeight === historyHeightRef.current) return;
      chatBoxRef.current.scrollTo({
        left: 0,
        top: currentHeight - historyHeightRef.current,
        behavior: 'smooth'
      });
      console.log(
        'historyHeightRef.current: 1',
        historyHeightRef.current,
        currentHeight
      );
      historyHeightRef.current = currentHeight;

      console.log(
        'historyHeightRef.current:2 ',
        historyHeightRef.current,
        currentHeight
      );
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

                return (
                  <ChatCard
                    key={item2.friend_account + index2.toString()}
                    content={htmlContent}
                    time={item2.create_time}
                    avatar={avatar}
                    type={item2.type}
                    avatarString={avatarString}
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
