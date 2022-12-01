import React from 'react';
import { ChatPageLeftBar } from '@component/chatRoomPage/chatPageLeftBar/chatPageLeftBar';
import { ChatPageTopBar } from '@component/chatRoomPage/chatPageTopBar/chatPageTopBar';
import { ChatPageMain } from '@src/component/chatRoomPage/chatPageMain/chatPageMain';
import styles from './chatPageFragment.module.scss';
import { useParams } from 'react-router-dom';
import AddressBook from '../addressBook/addressBook';
import Application from '../application/application';
import Mine from './mine/mine';
import { AuthRoute } from '@src/routes/authRoutes';
import LostPage from '../lostPage';
import CollectPage from '../collectPage/collectPage';

function ChatPageFragment(): JSX.Element {
  /**
   * 公共区域
   */

  const { chatId } = useParams();

  function onChangeItem(): JSX.Element {
    switch (chatId) {
      case 'message':
        return <AuthRoute element={<ChatPageMain />} />;
      case 'addressBook':
        return <AuthRoute element={<AddressBook />} />;
      case 'app':
        return <AuthRoute element={<Application />} />;
      case 'mine':
        return <AuthRoute element={<Mine />} />;
      case 'collect':
        return <AuthRoute element={<CollectPage />} />;
      default:
        return <LostPage />;
    }
  }

  return (
    <div className={styles.container}>
      <ChatPageLeftBar />
      <ChatPageTopBar />

      <div className={styles.inner_container}>
        {/* <Routes>
          <Route
            path="/message"
            element={<AuthRoute element={<ChatPageMain />} />}
          />
          <Route
            path="addressBook"
            element={<AuthRoute element={<AddressBook />} />}
          />
          <Route path="app" element={<AuthRoute element={<Application />} />} />
          <Route path="mine" element={<AuthRoute element={<Mine />} />} />
          <Route path="collect" element={<AuthRoute element={<Collect />} />} />
        </Routes> */}

        {onChangeItem()}
      </div>
    </div>
  );
}

export default ChatPageFragment;
