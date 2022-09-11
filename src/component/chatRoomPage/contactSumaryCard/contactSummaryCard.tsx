import React from 'react';
import styles from './contactSummaryCard.module.scss';

export function ContcatSumaryCard(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.avatar_box}>
        <img src={require('@pic/pic/logo.png')} className={styles.avatar_img} />
      </div>

      <div className={styles.content_box}>
        <p className={styles.contact_nickname}>伟伟酱</p>
        <p className={styles.contact_summay}>小鱼: 这个还是可以的</p>
      </div>

      <p className={styles.time}>
        12: 06
      </p>
    </div>
  );
}
