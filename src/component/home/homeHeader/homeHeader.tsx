import React from 'react';
import { IconDragDot } from '@arco-design/web-react/icon';
import avatar from '@pic/pic/logo.png';
import styles from './homeHeader.module.scss';

export function HomeHeader(): JSX.Element {
  return (
    <div className={styles.container}>
      <section className={styles.title_box}>
        <p className={styles.title_text}>小偶遇</p>
      </section>

      <section className={styles.option_box}>
        <div className={styles.option_item}>介绍</div>
        <div className={styles.option_item}>实现方案</div>
        <div className={styles.option_item}>产品特色</div>
      </section>

      <section className={styles.person_box}>
        <div className={styles.product_rect}>
          <IconDragDot style={{ fontSize: 20 }} />
        </div>

        <div className={styles.personal_card_box}>
          <img src={avatar} className={styles.avatar_img} alt="" />
          <p className={styles.nickname}>伟伟酱</p>
        </div>

        <button className={styles.tryBtn}>体验一下</button>
      </section>
    </div>
  );
}
