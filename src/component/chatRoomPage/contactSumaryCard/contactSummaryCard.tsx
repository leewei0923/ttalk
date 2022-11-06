import React from 'react';
import styles from './contactSummaryCard.module.scss';

interface ContcatSumaryCardProps {
  avatarUrl: string;
  nickname: string;
  message: string;
  time: string;
}

export function ContcatSumaryCard(props: ContcatSumaryCardProps): JSX.Element {
  /**
   * 公共区域
   */
  const { avatarUrl, nickname, message, time } = props;

  // ========================
  return (
    <div className={styles.container}>
      <div className={styles.avatar_box}>
        <img src={avatarUrl} className={styles.avatar_img} />
      </div>

      <div className={styles.content_box}>
        <p className={styles.contact_nickname}>{nickname}</p>
        <p className={styles.contact_summay}>{message}</p>
      </div>

      <p className={styles.tag}>
        <div className={styles.time}>{time}</div>

        <div className={styles.message_count}>4</div>
      </p>
    </div>
  );
}
