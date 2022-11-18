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
import { getCursorPosition, insertText } from '@src/util/cursorPosition';

interface ChatInputBoxProps {
  expandSwitch: () => void;
  onSubmit: (content: string) => void;
}

export function ChatInputBox(props: ChatInputBoxProps): JSX.Element {
  /**
   * 公共区域
   */

  // ======================
  const editorRef = useRef<HTMLPreElement>(null);
  const { expandSwitch, onSubmit } = props;

  /**
   * 发送按钮
   */
  const onSendBtn = (): void => {
    const htmlNodes = editorRef.current?.innerHTML;
    if (typeof onSubmit !== 'function') return;
    onSubmit(htmlNodes ?? '');
  };

  /**
   * 拿到emoji
   */
  const cursorPosition = useRef(0);

  const onInput = (): void => {
    const editorNode = document.querySelector('.' + styles.editor);
    const position = getCursorPosition(editorNode);

    cursorPosition.current = position;
  };

  const [emojiFlag, setEmojiFlag] = useState(false);
  const onGetEmoji = (emoji: string): void => {
    const editorNode = document.querySelector('.' + styles.editor);

    insertText(editorNode, emoji, cursorPosition.current);
    const position = getCursorPosition(editorNode);
    cursorPosition.current = position;
  };

  const onEnterDown = (e: React.KeyboardEvent<HTMLPreElement>): boolean => {
    if (e.shiftKey && e.code === 'Enter') {
      console.log(2);
    } else if (e.code === 'Enter') {
      console.log('发送');
      onSendBtn();
    }

    return true;
  };

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
          onInput={() => onInput()}
          ref={editorRef}
          onKeyDown={onEnterDown}
        ></pre>

        <div className={styles.chat_editer_wrap}>
          <div
            className={styles.emoji}
            onClick={() => setEmojiFlag(!emojiFlag)}
          >
            <img src={face} style={{ width: '20px', strokeWidth: 2 }} />
          </div>
          <div className={`${styles.iconUp_circle} ${styles.icon}`}>
            <IconUpCircle style={{ width: '20px', strokeWidth: 2 }} />
          </div>
          <div className={`${styles.expand} ${styles.icon}`} onClick={expandSwitch}>
            <IconExpand style={{ width: '20px', strokeWidth: 2 }} />
          </div>
          <div className={`${styles.send_btn} ${styles.icon}`} onClick={() => onSendBtn()}>
            <IconSend style={{ width: '20px', strokeWidth: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
