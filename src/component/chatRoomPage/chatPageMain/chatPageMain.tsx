import React from 'react';
import { ChatConcatList } from '../chatConcatList/chatConcatList';
import { ChatInputBox } from '../chatInputBox/chatInputBox';
import { ChatPageBox } from '../chatPageBox/chatPageBox';
import { ContactPageTopBar } from '../contactPageTopBar/contactPageTopBar';

import styles from './chatPageMain.module.scss';

export function ChatPageMain(): JSX.Element {
 
  return (
    <div className={styles.container}>
      <section className={styles.external_container}>
        {/* 联系人展示区域 */}

        <div className={styles.contact_box}>
          <ChatConcatList />
        </div>

        <section className={styles.chat_page_container}>
          <ContactPageTopBar />
          <ChatPageBox />
          <ChatInputBox />
        </section>
      </section>
    </div>
  );
}
