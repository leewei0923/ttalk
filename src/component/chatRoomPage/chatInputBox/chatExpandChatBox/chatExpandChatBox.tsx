import React, { useRef, useState } from 'react';
import styles from './chatExpandChatBox.module.scss';
import face from '@pic/icon/face.svg';
import { IconFileImage, IconShrink } from '@arco-design/web-react/icon';
import Emoji from '../emoji/emoji';
import { getCursorPosition, insertText } from '@src/util/cursorPosition';

interface ExpandChatBoxProps {
  expandSwitch: () => void;
  onSubmit: (content: string) => void;
}

export function ExpandChatBox(props: ExpandChatBoxProps): JSX.Element {
  /**
   * 公共空间
   */
  const { expandSwitch, onSubmit } = props;

  //   ======================

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
    setEmojiFlag(false);
  };

  /**
   * 发送按钮
   */
  const editorRef = useRef<HTMLPreElement>(null);

  const onSendBtn = (): void => {
    const htmlNodes = editorRef.current?.innerHTML;
    if (typeof onSubmit !== 'function') return;
    onSubmit(htmlNodes ?? '');
  };

  return (
    <div className={styles.container}>
      <section className={styles.options_container}>
        <div className={styles.emoji_and_photo}>
          <span
            className={styles.emoji}
            onClick={() => setEmojiFlag(!emojiFlag)}
          >
            <img src={face} style={{ width: '20px', strokeWidth: 2 }} />
          </span>

          <span
            className={styles.photo}
            // onClick={() => setEmojiFlag(!emojiFlag)}
          >
            <IconFileImage style={{ width: '20px', strokeWidth: 5 }} />
          </span>
        </div>
        <div className={styles.change_switch} onClick={expandSwitch}>
          <IconShrink style={{ width: '20px', strokeWidth: 5 }} />
        </div>
      </section>

      <section className={styles.edit_container}>
        <pre
          contentEditable={true}
          //   data-tootip={}
          ref={editorRef}
          suppressHydrationWarning={true}
          className={styles.editor}
          onInput={() => onInput()}
        ></pre>
      </section>

      <section className={styles.send_btn_container}>
        <button className={styles.send_btn} onClick={() => onSendBtn()}>
          发送消息
        </button>
      </section>

      <div className={styles.emoji_picker} style={{ visibility: emojiFlag ? 'visible' : 'hidden' }}>
        <Emoji onClick={onGetEmoji} />
      </div>
    </div>
  );
}
