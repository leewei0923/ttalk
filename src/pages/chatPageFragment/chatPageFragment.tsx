import React from 'react';
import { ChatPageLeftBar } from '@component/chatRoomPage/chatPageLeftBar/chatPageLeftBar';
import { ChatPageTopBar } from '@component/chatRoomPage/chatPageTopBar/chatPageTopBar';
import styles from './chatPageFragment.module.scss';

function ChatPageFragment(): JSX.Element {
  return (
    <div className={styles.container}>
      <ChatPageLeftBar />
      <ChatPageTopBar />
    </div>
  );
}

export default ChatPageFragment;
