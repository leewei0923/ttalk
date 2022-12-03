import { Avatar } from '@arco-design/web-react';
import {
  GetUnreadCount,
  LatestMessage
} from '@src/database/hanleConcatSummaryCard';
import { trimmedDate } from '@src/util/handleTime';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './contactSummaryCard.module.scss';

interface ContcatSumaryCardProps {
  avatarUrl: string;
  nickname: string;
  message: string;
  time: string;
  account: string;
  globalAccount: string;
  onClick?: (
    account: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

export function ContcatSumaryCard(props: ContcatSumaryCardProps): JSX.Element {
  /**
   * 公共区域
   */
  const { avatarUrl, nickname, time, account, onClick, globalAccount } = props;

  const container = classNames({
    [styles.container]: true,
    [styles.selected]: globalAccount === account
  });

  const [messageCount, setMessageCount] = useState(0);
  const [showMessage, setShowMessage] = useState('');

  useEffect(() => {
    GetUnreadCount(account)
      .then((res) => {
        setMessageCount(res);
      })
      .catch((err) => console.log('计数出现问题', err));

    LatestMessage(account)
      .then((res) => {
        setShowMessage(res);
      })
      .catch((err) => console.log('计数出现问题', err));
  }, [time, globalAccount]);

  // ========================
  return (
    <div
      className={container}
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
        <p className={styles.contact_summay}>{showMessage}</p>
      </div>

      <div className={styles.tag}>
        <div className={styles.time}>{trimmedDate(time)}</div>

        <div
          className={styles.message_count}
          style={{ opacity: messageCount === 0 ? 0 : 1 }}
        >
          {messageCount}
        </div>
      </div>
    </div>
  );
}
