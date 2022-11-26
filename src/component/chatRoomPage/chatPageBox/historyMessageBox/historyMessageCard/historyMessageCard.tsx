import { Avatar } from '@arco-design/web-react';
import React from 'react';
import styles from './historyMessageCard.module.scss';

interface HistoryMessageCardProps {
  avatarUrl: string;
  nickname: string;
  message: string;
  time: string;
  account: string;
}

export function HistoryMessageCard(
  props: HistoryMessageCardProps
): JSX.Element {
  /**
   * 公共区域
   */
  const { avatarUrl, nickname, message, time, account } = props;

  // ========================
  return (
    <div className={styles.container}>
      <div className={styles.avatar_box}>
        {/* <img src={avatarUrl} className={styles.avatar_img} /> */}

        {typeof avatarUrl === 'string' && avatarUrl.length > 5 ? (
          <img src={avatarUrl} className={styles.avatar_img} />
        ) : (
          <Avatar
            style={{ backgroundColor: '#EA4335' }}
            autoFixFontSize={false}
            size={40}
            shape="circle"
          >
            {(nickname ?? '').length > 0
              ? (nickname ?? '')?.charAt(0)
              : account?.charAt(0)}
          </Avatar>
        )}
      </div>

      <div className={styles.content_box}>
        <p className={styles.contact_nickname}>{nickname}</p>
        <p
          className={styles.contact_summay}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>

      <div className={styles.tag}>
        <div className={styles.time}>{time}</div>
      </div>
    </div>
  );
}
