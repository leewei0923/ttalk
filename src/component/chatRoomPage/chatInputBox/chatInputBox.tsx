/* eslint-disable react/no-unescaped-entities */
import {
  IconExpand,
  IconSend,
  IconUpCircle
} from '@arco-design/web-react/icon';
import React from 'react';
import face from '@pic/icon/face.svg';
import styles from './chatInputBox.module.scss';

export function ChatInputBox(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.input_box}>
        <pre className={styles.editor} contentEditable>
          <p>你好</p>
          <p><br /></p>
        </pre>

        <div className={styles.chat_editer_wrap}>
          <div className={styles.emoji}>
            <img src={face} style={{ width: '20px', strokeWidth: 2 }} />
          </div>
          <div className={styles.iconUp_circle}>
            <IconUpCircle style={{ width: '20px', strokeWidth: 2 }} />
          </div>
          <div className={styles.expand}>
            <IconExpand style={{ width: '20px', strokeWidth: 2 }} />
          </div>
          <div className={styles.send_btn}>
            <IconSend style={{ width: '20px', strokeWidth: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
