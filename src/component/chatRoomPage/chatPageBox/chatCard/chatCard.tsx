import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from './chatCard.module.scss';
import { Avatar, Message, Tooltip } from '@arco-design/web-react';
import { IconMore } from '@arco-design/web-react/icon';
import { MessageDetailData } from '@src/util/handleChat';
import { clearText, handleText } from '@src/util/handleJSON';
import { JSONContent } from '@tiptap/react';
import { apiInsertCollect } from '@src/api/collect';
import { nanoid } from '@reduxjs/toolkit';
import { HandleCollectDB } from '@src/database/hanleDbService';

type readFunction = (remoteId: string, message: MessageDetailData) => void;
interface ChatCardPropsType {
  remoteId: string;
  content: string;
  time: string;
  type: 'send' | 'receive' | string;
  avatar: string;
  flag: boolean;
  onRead: readFunction | undefined;
  message: MessageDetailData;
  onMessageDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    message: MessageDetailData
  ) => void;
}

export function ChatCard(props: ChatCardPropsType): JSX.Element {
  const {
    remoteId,
    content,
    time,
    type,
    avatar,
    flag,
    onRead,
    message,
    onMessageDelete
  } = props;
  const timeFormat = time.split(' ')[1];
  const handleCollectDB = new HandleCollectDB();

  const defaultClass = {
    container: classnames({
      [styles.container]: true,
      [styles.recontainer]: type === 'send'
    }),
    innerContainer: classnames({
      [styles.innerContainer]: true,
      [styles.reverse]: type === 'send'
    }),
    chat_content_box: classnames({
      [styles.chat_content_box]: true,
      [styles.FaceWithSmilingEyes]:
        message.mood_state === 'FaceWithSmilingEyes',
      [styles.smilingFaceWithSmilingEyes]:
        message.mood_state === 'smilingFaceWithSmilingEyes',
      [styles.loudlyCryingFace]: message.mood_state === 'loudlyCryingFace',
      [styles.pleadingFace]: message.mood_state === 'pleadingFace',
      [styles.expressionlessFace]: message.mood_state === 'expressionlessFace',
      [styles.worriedFace]: message.mood_state === 'worriedFace'
    })
  };

  const messageRef = useRef<HTMLDivElement>(null);

  function init(): void {
    if (typeof onRead === 'function') {
      if (!flag && messageRef.current !== null && message.type === 'receive') {
        onRead(remoteId, message);
      }
    }
  }

  /**
   * ???????????????
   */
  const onPopupMenu = (): JSX.Element => {
    return (
      <div className={styles.menus}>
        <button className={styles.menuItem} onClick={() => onCopy()}>
          ??????
        </button>
        <button className={styles.menuItem} onClick={() => onCollect()}>
          ??????
        </button>
        <button className={styles.menuItem}>??????</button>
        <button className={styles.menuItem} onClick={(e) => onDelete(e)}>
          ??????
        </button>
      </div>
    );
  };

  function onCopy(): void {
    const chatData: JSONContent = JSON.parse(message.message);
    const text = handleText(chatData);

    void navigator.clipboard.writeText(text).catch((error) => {
      Message.error('??????????????????');
      console.log(error);
    });
    clearText();

    Message.success('????????????');
  }

  function onCollect(): void {
    const reqObj = {
      collect_id: nanoid(),
      account: message.user_account,
      content: message.message,
      origin: message.friend_account,
      type: 'messageNote'
    };

    apiInsertCollect(reqObj).catch((err) => console.log('?????????????????????', err));
    handleCollectDB.insert(reqObj);

    Message.info('????????????');
  }

  function onDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (typeof onDelete === 'function') {
      onMessageDelete(e, message);
    }
  }

  // ========================

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={defaultClass.container} ref={messageRef}>
      <div className={defaultClass.innerContainer}>
        {avatar.length > 10 ? (
          <img src={avatar} className={styles.chat_avatar_img} />
        ) : (
          <Avatar
            style={{ backgroundColor: '#165DFF' }}
            autoFixFontSize={false}
            size={40}
            shape="circle"
          >
            {(avatar ?? '').length > 0 ? (avatar ?? '').charAt(0) : ''}
          </Avatar>
        )}

        <div
          className={defaultClass.chat_content_box}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <div className={styles.time}>
          <p>{timeFormat}</p>
          <p>{flag && message.type === 'send' ? '??????' : ''}</p>

          <div>
            <Tooltip
              style={{ padding: 0 }}
              color="#FBFFFB"
              position="right"
              content={onPopupMenu()}
            >
              <IconMore />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
