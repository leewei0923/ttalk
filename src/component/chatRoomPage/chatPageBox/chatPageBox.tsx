import React from 'react';
import { ChatCard } from './chatCard/chatCard';
import { chatData } from './data';
import styles from './chatPageBox.module.scss';

export function ChatPageBox(): JSX.Element {
  return (
    <div className={styles.container}>
      {chatData.map((item): any => {
        return (
          <div key={item.id} className={styles.chat_content_container}>
            <p className={styles.date_text}>{item.date}</p>
            {item.children.map((item2) => {
              return (
                <ChatCard
                  key={item2.id}
                  src={item2.avatar_url}
                  content={JSON.stringify(item2.content)}
                  time={item2.time}
                  isReverse={item2.openid === 'weiwei'}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
