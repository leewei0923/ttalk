import styles from './homeText.module.scss';
import React from 'react';

export function HomeText(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_container}>
          <p className={styles.content_container_text}>Welcome</p>

          <ul className={styles.content_container_list}>
            <li className={styles.content_container_list_item}>TTalk !</li>
            <li className={styles.content_container_list_item}>friend !</li>
            <li className={styles.content_container_list_item}>users !</li>
            <li className={styles.content_container_list_item}>everybody !</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
