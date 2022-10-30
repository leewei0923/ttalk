/* eslint-disable react/no-unescaped-entities */
import {
  IconExpand,
  IconSend,
  IconUpCircle
} from '@arco-design/web-react/icon';
import React, { useRef, useState } from 'react';
import face from '@pic/icon/face.svg';
import styles from './chatInputBox.module.scss';
import Emoji from './emoji/emoji';

export function ChatInputBox(): JSX.Element {
  /**
   * 公共区域
   */

  // ======================
  const editorRef = useRef<HTMLPreElement>(null);

  /**
   * 发送按钮
   */
  const onSendBtn = (): void => {
    const htmlNodes = editorRef.current?.innerHTML;
    console.log(htmlNodes);
  };

  /**
   * 拿到emoji
   */
  const [emojiFlag, setEmojiFlag] = useState(false);
  const onGetEmoji = (emoji: string): void => {
    console.log(emoji);
  };

  const onInput = (e: any):void => {
    console.log(e);
  }

  return (
    <div className={styles.container}>
      <div
        style={{ visibility: emojiFlag ? 'visible' : 'hidden' }}
        className={styles.emojiPicker}
      >
        <Emoji onClick={onGetEmoji} />
      </div>

      <div className={styles.input_box}>
        <pre
          className={styles.editor}
          suppressContentEditableWarning={true}
          contentEditable
          onInput={onInput}
          ref={editorRef}
        >
          <p>你好</p>
          <p>
            <br />
          </p>
        </pre>

        <div className={styles.chat_editer_wrap}>
          <div className={styles.emoji} onClick={() => setEmojiFlag(!emojiFlag)}>
            <img src={face} style={{ width: '20px', strokeWidth: 2 }} />
          </div>
          <div className={styles.iconUp_circle}>
            <IconUpCircle style={{ width: '20px', strokeWidth: 2 }} />
          </div>
          <div className={styles.expand}>
            <IconExpand style={{ width: '20px', strokeWidth: 2 }} />
          </div>
          <div className={styles.send_btn} onClick={() => onSendBtn()}>
            <IconSend style={{ width: '20px', strokeWidth: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
