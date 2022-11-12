import { Avatar } from '@arco-design/web-react';
import React from 'react';
import styles from './userCard.module.scss';

interface UserCardType {
  hide?: boolean;
  avatar: string | undefined;
  nickname: string | undefined;
  motto: string | undefined;
  account: string | undefined;
  buttonState: 'new' | 'friend';
  onAddUser: () => void;
  onSendMessage: () => void;
}

export function UserCard(props: UserCardType): JSX.Element {
  /**
   * 公共区域
   */
  const {
    hide,
    avatar,
    nickname,
    buttonState,
    account,
    onAddUser,
    onSendMessage
  } = props;

  // ==================
  return (
    <div
      className={styles.add_concat_box}
      style={{ visibility: hide === false ? 'visible' : 'hidden' }}
    >
      {typeof avatar === 'string' && avatar !== '' ? (
        <img src={avatar} />
      ) : (
        <Avatar
          style={{ backgroundColor: '#14a9f8' }}
          autoFixFontSize={false}
          size={35}
          shape="square"
        >
          {typeof nickname === 'string' && nickname.length > 0
            ? nickname
            : account?.charAt(0)}
        </Avatar>
      )}

      <p>
        {typeof nickname === 'string' && nickname.length > 0
          ? nickname
          : account}
      </p>

      {buttonState === 'new' ? (
        <button onClick={() => onAddUser()}>添加</button>
      ) : (
        <button onClick={() => onSendMessage()}>发消息</button>
      )}
    </div>
  );
}
