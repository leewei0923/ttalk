/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useEffect, useState } from 'react';
import face from '@pic/icon/face.svg';
import { IconFileImage, IconShrink } from '@arco-design/web-react/icon';
import Emoji from '../emoji/emoji';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ExpandBoxMenuItem } from './menuItems/menuItem';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import CharacterCount from '@tiptap/extension-character-count';
import styles from './chatExpandChatBox.module.scss';
import Image from '@tiptap/extension-image';
import { upload } from '@src/request/upload';
import { GetTtakLoginUser } from '@src/common/personInfo';
import dayjs from 'dayjs';
import { uploadURL } from '@src/request/url';

interface ExpandChatBoxProps {
  expandSwitch: () => void;
  onSubmit: (content: JSONContent, type: 'normal' | 'rich') => void;
}

export function ExpandChatBox(props: ExpandChatBoxProps): JSX.Element {
  /**
   * 公共空间
   */
  const { expandSwitch, onSubmit } = props;

  const loginAccount = GetTtakLoginUser();

  //   ======================

  /**
   * tiptap编辑器配置
   */
  const limit = 2000;
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Image,
      CharacterCount.configure({
        limit
      })
    ]
  });

  /**
   * 拿到emoji
   */

  const [emojiFlag, setEmojiFlag] = useState(false);
  const onGetEmoji = (emoji: string): void => {
    if (editor !== null) {
      editor.commands.insertContent(emoji);
    }
  };

  /**
   * 图片上传
   */
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formDatas = new FormData();
    const file = e.target.files;
    if (loginAccount === '') return;

    const curDate = dayjs().format('YYYY-MM-DD');
    const year = dayjs().format('YYYY');
    const month = dayjs().format('MM');
    const day = dayjs().format('DD');
    const randomNum = Math.floor(Math.random() * 100000).toString();
    const account = loginAccount[0].account;

    if (file !== null) {
      const suffixName = file[0].type.split('/')[1];
      const fileName = `${curDate}-${randomNum}_${account}.${suffixName}`;
      formDatas.set('image', file[0], fileName);
      upload('/file/uploadAvatar', formDatas)
        .then((res) => {
          if (editor !== null) {
            setTimeout(() => {
              editor
                .chain()
                .focus()
                .setImage({
                  src: `${uploadURL}${year}/${month}/${day}/${randomNum}_${account}.${suffixName}`
                })
                .run();
            }, 500);
          }
        })
        .catch((err) => console.log('请求图片出现问题', err));
    }
  };

  /**
   * 发送按钮
   */

  const onSendBtn = (): void => {
    const jsonContent = editor?.getJSON();

    if (typeof onSubmit !== 'function' || jsonContent === undefined) return;
    onSubmit(editor?.getJSON() ?? {}, 'rich');
  };

  useEffect(() => {}, []);

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

          <span className={styles.photo}>
            <input
              className={styles.upload}
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              onChange={(e) => onUploadImage(e)}
            />
            <IconFileImage style={{ width: '20px', strokeWidth: 5 }} />
          </span>
        </div>
        {/* -------------- */}
        <ExpandBoxMenuItem editor={editor} />

        {/* -------------- */}
        <div className={styles.change_switch} onClick={expandSwitch}>
          <IconShrink style={{ width: '20px', strokeWidth: 5 }} />
        </div>
      </section>

      <section className={styles.edit_container}>
        <EditorContent
          className={styles.editor}
          style={{
            padding: '10px 20px',
            minHeight: '350px',
            minWidth: '100%',
            background: '#F2F3F5'
          }}
          editor={editor}
        />
      </section>

      <section className={styles.send_btn_container}>
        <button className={styles.send_btn} onClick={() => onSendBtn()}>
          发送消息
        </button>
      </section>

      <div
        className={styles.emoji_picker}
        style={{ visibility: emojiFlag ? 'visible' : 'hidden' }}
      >
        <Emoji onClick={onGetEmoji} />
      </div>
    </div>
  );
}
