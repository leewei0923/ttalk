import React, { useEffect } from 'react';
import { ChatCard } from './chatCard/chatCard';
// import { chatData } from './data';
import styles from './chatPageBox.module.scss';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { MessageData } from '@src/util/handleChat';

interface ChatPageBoxProps {
  messageData: MessageData[] | '';
  avatar: string;
  avatarString: string;
}

export function ChatPageBox(props: ChatPageBoxProps): JSX.Element {
  const { messageData, avatar, avatarString } = props;

  if (messageData === '') {
    return <>暂时没有数据</>;
  }
  
  /**
   * 监听滚动栏
   */
  function onScroll():void {
    console.log("打印");
  }

  useEffect(() => {
    
  }, [])


  return (
    <div className={styles.container} onScroll={onScroll} >
      {messageData.map((item): any => {
        return (
          <div key={item.date} className={styles.chat_content_container}>
            <p className={styles.date_text}>{item.date}</p>
            {item.children.map((item2, index2) => {
              const htmlContent = generateHTML(JSON.parse(item2.message), [
                StarterKit,
                TextStyle,
                Color
                // other extensions …
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
  );
}
