import React from 'react';
import styles from './newFriend.module.scss';
import { NewFriendsCard } from './newFriendCard/newFriendCard';

interface NewFriendsProps {
  onChangePageMode?: (str: string) => void;
}

export function NewFriends(props: NewFriendsProps): JSX.Element {
  /**
   * 公共区域
   */

  // =========================
  return (
    <div className={styles.container}>
      <h2 className={styles.top_title}>新的朋友</h2>

      <NewFriendsCard />
    </div>
  );
}
