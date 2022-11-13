import { UserInfo } from '@src/component/addressBook/userInfo/userInfo';
import { UserList } from '@src/component/addressBook/userList/userList';
import React, { useState } from 'react';
import styles from './addressBook.module.scss';
import { Empty } from '@arco-design/web-react';
import { NewFriends } from '@src/component/addressBook/newFriends/newFriends';
import { pageStateType } from '@src/types';

function AddressBook(): JSX.Element {
  /**
   * 控制右边显示的控件
   */
  const [pageState, setPageState] = useState<string>('');

  const onChangePageState = (data: pageStateType): void => {
    if (data.type === 'friend') {
      setPageState(data.content);
    } else if (data.type === 'account') {
      setPageState(data.content);
    }
  };

  const onShowPage = (): JSX.Element => {
    if (pageState === '') {
      return <Empty style={{ width: 'calc(100% - 315px)' }} />;
    } else if (pageState === 'newFriends') {
      return <NewFriends onChangePageMode={onChangePageState} />;
    } else {
      return <UserInfo account={pageState} />;
    }
    return <div></div>;
  };

  return (
    <div className={styles.container}>
      <UserList onChangePageMode={onChangePageState} />
      {onShowPage()}
    </div>
  );
}

export default AddressBook;
