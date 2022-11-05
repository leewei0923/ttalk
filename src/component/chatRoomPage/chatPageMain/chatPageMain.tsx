import { ContentParser } from '@src/util/inputParser';
import React, { useState } from 'react';
import { ChatConcatList } from '../chatConcatList/chatConcatList';
import { ExpandChatBox } from '../chatInputBox/chatExpandChatBox/chatExpandChatBox';
import { ChatInputBox } from '../chatInputBox/chatInputBox';
import { ChatPageBox } from '../chatPageBox/chatPageBox';
import { ContactPageTopBar } from '../contactPageTopBar/contactPageTopBar';

import styles from './chatPageMain.module.scss';

export function ChatPageMain(): JSX.Element {
  /**
   * 公共区域
   */
  const contentParser = new ContentParser();

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
      </section>
    </div>
  );
}
