import { UserInfo } from '@src/component/addressBook/userInfo/userInfo';
import { UserList } from '@src/component/addressBook/userList/userList';
import React from 'react';
import styles from './addressBook.module.scss';

function AddressBook(): JSX.Element {
  return (
    <div className={styles.container}>
      <UserList />
      <UserInfo />
    </div>
  );
}

export default AddressBook;
