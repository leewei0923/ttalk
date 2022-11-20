import React from 'react';
import { ChatCard } from './chatCard/chatCard';
import { chatData } from './data';
import styles from './chatPageBox.module.scss';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

export function ChatPageBox(): JSX.Element {
  return (
    <div className={styles.container}>
      {chatData.map((item): any => {
        return (
          <div key={item.id} className={styles.chat_content_container}>
            <p className={styles.date_text}>{item.date}</p>
            {item.children.map((item2) => {
              const htmlContent = generateHTML(JSON.parse(item2.content), [
                StarterKit,
                TextStyle,
                Color
                // other extensions …
              ]);

              return (
                <ChatCard
                  key={item2.id}
                  content={htmlContent}
                  time={item2.time}
                  avatar={item2.avatar_url}
                  type={item2.type}
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
