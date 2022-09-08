import React from 'react';
import face3d from '@pic/icon/3Dface.svg';
import styles from './homeIntro.module.scss';

export function HomeIntro(): JSX.Element {
  return (
    <div className={styles.container}>
      <section className={styles.left_container}>
        <img src={face3d} className={styles.face3d} />
      </section>

      <section className={styles.right_container}>
        <div className={styles.nickname}>HI, 伟伟酱</div>
        <div className={styles.desc}>与你分享, 真好</div>
      </section>
    </div>
  );
}
