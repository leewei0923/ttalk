/* eslint-disable react/no-unescaped-entities */
import {
  IconExpand,
  IconSend,
  IconUpCircle
} from '@arco-design/web-react/icon';
import React, { useState } from 'react';
import face from '@pic/icon/face.svg';
import styles from './chatInputBox.module.scss';
import Emoji from './emoji/emoji';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import CharacterCount from '@tiptap/extension-character-count';
import useDebounce from '@src/hooks/debounce';
import Paragraph from '@tiptap/extension-paragraph';

interface ChatInputBoxProps {
  expandSwitch: () => void;
  onSubmit: (content: JSONContent) => void;
}

export function ChatInputBox(props: ChatInputBoxProps): JSX.Element {
  /**
   * 公共区域
   */

  // ======================
  const { expandSwitch, onSubmit } = props;

  /**
   * tiptap编辑器配置
   */
  const limit = 2000;
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Paragraph,
      CharacterCount.configure({
        limit
      })
    ]
  });

  /**
   * 发送按钮
   */
  const onSendBtn = (): void => {
    const jsonContent = editor?.getJSON();

    if (typeof onSubmit !== 'function' || jsonContent === undefined) return;
    onSubmit(editor?.getJSON() ?? {});
    editor?.chain().deleteNode('paragraph');
  };

  /**
   * 拿到emoji
   */

  const [emojiFlag, setEmojiFlag] = useState(false);
  const onGetEmoji = (emoji: string): void => {
    if (editor !== null) {
      editor.commands.insertContent(emoji);
    }
  };

  const [onEnterDown] = useDebounce(
    (e): boolean => {
      if (Boolean(e.ctrlKey) && e.code === 'Enter') {
        onSendBtn();
      }

      return true;
    },
    500,
    []
  );

  return (
    <div className={styles.container}>
      <div
        style={{ visibility: emojiFlag ? 'visible' : 'hidden' }}
        className={styles.emojiPicker}
      >
        <Emoji onClick={onGetEmoji} />
      </div>

      <div className={styles.input_box}>
        <EditorContent
          className={styles.editor}
          editor={editor}
          onKeyDown={(e) => onEnterDown(e)}
        />

        <div className={styles.chat_editer_wrap}>
          <div
            className={styles.emoji}
            onClick={() => setEmojiFlag(!emojiFlag)}
          >
            <img src={face} style={{ width: '20px', strokeWidth: 2 }} />
          </div>
          <div className={`${styles.iconUp_circle} ${styles.icon}`}>
            <IconUpCircle style={{ width: '20px', strokeWidth: 5 }} />
          </div>
          <div
            className={`${styles.expand} ${styles.icon}`}
            onClick={expandSwitch}
          >
            <IconExpand style={{ width: '20px', strokeWidth: 5 }} />
          </div>
          <div
            className={`${styles.send_btn} ${styles.icon}`}
            onClick={() => onSendBtn()}
          >
            <IconSend style={{ width: '20px', strokeWidth: 5 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
