import React, { useEffect, useRef } from 'react';
import { ChatCard } from './chatCard/chatCard';
// import { chatData } from './data';
import styles from './chatPageBox.module.scss';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { MessageData } from '@src/util/handleChat';
// import { Spin } from '@arco-design/web-react';

interface ChatPageBoxProps {
  messageData: MessageData[] | '';
  avatar: string;
  avatarString: string;
  correspond?: string;
}

export function ChatPageBox(props: ChatPageBoxProps): JSX.Element {
  const { messageData, avatar, avatarString, correspond } = props;
  // ======================

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const historyHeightRef = useRef<number | null>(null);
  function scrollToBottom(): void {
    if (chatBoxRef.current === null) return;

    const currentHeight = chatBoxRef.current.scrollHeight;

    chatBoxRef.current.scrollTo({
      left: 0,
      top: historyHeightRef.current ?? 10000,
      behavior: 'smooth'
    });
    historyHeightRef.current = currentHeight + 200;
  }

  if (correspond === undefined || correspond === '') {
    scrollToBottom();
  } else if (correspond === 'send') {
    scrollToBottom();
  }

  useEffect(() => {
    return () => {};
  }, []);

  if (messageData === '') {
    return <>暂时没有数据</>;
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.loding}>
        <Spin />
      </div> */}
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
