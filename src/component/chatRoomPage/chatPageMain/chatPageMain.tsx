import React from 'react';
import { ChatInputBox } from '../chatInputBox/chatInputBox';
import { ChatPageBox } from '../chatPageBox/chatPageBox';
import { ContactPageTopBar } from '../contactPageTopBar/contactPageTopBar';
import { ContcatSumaryCard } from '../contactSumaryCard/contactSummaryCard';
import styles from './chatPageMain.module.scss';

export function ChatPageMain(): JSX.Element {
  const data = new Array(10).fill(0);
  return (
    <div className={styles.container}>
      <section className={styles.external_container}>
        {/* 联系人展示区域 */}

        <div className={styles.contact_box}>
          {data.map((item, index) => {
            return <ContcatSumaryCard key={`card${index}`} />;
          })}
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
