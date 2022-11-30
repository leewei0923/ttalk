import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from './chatCard.module.scss';
import { Avatar, Tooltip } from '@arco-design/web-react';
import { IconMore } from '@arco-design/web-react/icon';
import { MessageDetailData } from '@src/util/handleChat';
// import { isInViewPort } from '@src/util/util';

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
}

export function ChatCard(props: ChatCardPropsType): JSX.Element {
  const { remoteId, content, time, type, avatar, flag, onRead, message } =
    props;
  const timeFormat = time.split(' ')[1];

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
   * 弹出的菜单
   */
  const onPopupMenu = (): JSX.Element => {
    return (
      <div className={styles.menus}>
        <button className={styles.menuItem}>复制</button>
        <button className={styles.menuItem}>收藏</button>
        <button className={styles.menuItem}>多选</button>
        <button className={styles.menuItem}>删除</button>
      </div>
    );
  };

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
          <p>{flag && message.type === 'send' ? '已读' : ''}</p>

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
