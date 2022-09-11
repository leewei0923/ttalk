import React from 'react';
import { ChatPageLeftBar } from '@component/chatRoomPage/chatPageLeftBar/chatPageLeftBar';
import { ChatPageTopBar } from '@component/chatRoomPage/chatPageTopBar/chatPageTopBar';
import { ChatPageMain } from '@src/component/chatRoomPage/chatPageMain/chatPageMain';
import styles from './chatPageFragment.module.scss';

function ChatPageFragment(): JSX.Element {
  return (
    <div className={styles.container}>
      <ChatPageLeftBar />
      <ChatPageTopBar />
      <ChatPageMain />
    </div>
  );
}

export default ChatPageFragment;
