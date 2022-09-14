import React from 'react';
import { ChatPageLeftBar } from '@component/chatRoomPage/chatPageLeftBar/chatPageLeftBar';
import { ChatPageTopBar } from '@component/chatRoomPage/chatPageTopBar/chatPageTopBar';
import { ChatPageMain } from '@src/component/chatRoomPage/chatPageMain/chatPageMain';
import styles from './chatPageFragment.module.scss';
import { Route, Routes } from 'react-router-dom';
import AddressBook from '../addressBook/addressBook';
import Application from '../application/application';
import Mine from './mine/mine';

function ChatPageFragment(): JSX.Element {
  return (
    <div className={styles.container}>
      <ChatPageLeftBar />
      <ChatPageTopBar />

      <div className={styles.inner_container}>
        <Routes>
          <Route path="message" element={<ChatPageMain />} />
          <Route path="addressBook" element={<AddressBook />} />
          <Route path="app" element={<Application />} />
          <Route path="mine" element={<Mine />} />
        </Routes>
      </div>
    </div>
  );
}

export default ChatPageFragment;
