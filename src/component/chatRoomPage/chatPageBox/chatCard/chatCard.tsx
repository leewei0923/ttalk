import React from 'react';
import classnames from 'classnames';
import styles from './chatCard.module.scss';
import { Avatar } from '@arco-design/web-react';

interface ChatCardPropsType {
  content: string;
  time: string;
  type: 'send' | 'receive' | string;
  avatarString: string;
  avatar: string;
}

export function ChatCard(props: ChatCardPropsType): JSX.Element {
  const { content, time, type, avatar, avatarString } = props;
  const timeFormat = time.split(' ')[1];

  const defaultClass = {
    container: classnames({
      [styles.container]: true,
      [styles.recontainer]: type === 'send'
    }),
    innerContainer: classnames({
      [styles.innerContainer]: true,
      [styles.reverse]: type === 'send'
    })
  };

  return (
    <div className={defaultClass.container}>
      <div className={defaultClass.innerContainer}>
        {avatar !== '' ? (
          <img src={avatar} className={styles.chat_avatar_img} />
        ) : (
          <Avatar
            style={{ backgroundColor: '#165DFF' }}
            autoFixFontSize={false}
            size={40}
            shape="circle"
          >
            {(avatarString ?? '').length > 0
              ? (avatarString ?? '').charAt(0)
              : ''}
          </Avatar>
        )}

        <div
          className={styles.chat_content_box}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <div className={styles.time}>
          <p>{timeFormat}</p>
          <p>已读</p>
        </div>
      </div>
    </div>
  );
}
