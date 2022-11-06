import { UserInfo } from '@src/component/addressBook/userInfo/userInfo';
import { UserList } from '@src/component/addressBook/userList/userList';
import React, { useState } from 'react';
import styles from './addressBook.module.scss';
import { Empty } from '@arco-design/web-react';
import { NewFriends } from '@src/component/addressBook/newFriends/newFriends';

function AddressBook(): JSX.Element {

  /**
   * 控制右边显示的控件
   */
  const [pageState, setPageState] = useState<string>('');

  const onChangePageState = (str: string): void => {
    setPageState(str);
  };

  const onShowPage = (): JSX.Element => {
    if (pageState === '') {
      return <Empty style={{width: 'calc(100% - 315px)'}} />;
    } else if (pageState === 'newFriends') {
      return <NewFriends onChangePageMode={onChangePageState} />;
    } else {
      <UserInfo />;
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
