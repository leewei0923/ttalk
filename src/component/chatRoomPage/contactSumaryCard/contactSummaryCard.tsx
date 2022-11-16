import { Avatar } from '@arco-design/web-react';
import React from 'react';
import styles from './contactSummaryCard.module.scss';

interface ContcatSumaryCardProps {
  avatarUrl: string;
  nickname: string;
  message: string;
  time: string;
  account: string;
  onClick?: (
    account: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

export function ContcatSumaryCard(props: ContcatSumaryCardProps): JSX.Element {
  /**
   * 公共区域
   */
  const { avatarUrl, nickname, message, time, account, onClick } = props;

  // ========================
  return (
    <div
      className={styles.container}
      onClick={(e) =>
        typeof onClick === 'function' ? onClick(account, e) : ''
      }
    >
      <div className={styles.avatar_box}>
        {/* <img src={avatarUrl} className={styles.avatar_img} /> */}

        {typeof avatarUrl === 'string' && avatarUrl !== '' ? (
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
        <p className={styles.contact_summay}>{message}</p>
      </div>

      <div className={styles.tag}>
        <div className={styles.time}>{time}</div>

        <div className={styles.message_count}>4</div>
      </div>
    </div>
  );
}
