import { collect_data_entry } from '@src/database/db';
import React from 'react';
import styles from './collectCard.module.scss';

interface CollectCardProps {
  content: string;
  time: string;
  origin: string;
  collect: collect_data_entry;
  onClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    collect: collect_data_entry
  ) => void;
}

export function CollectCard(props: CollectCardProps): JSX.Element {
  const { content, time, origin, collect, onClick } = props;
  return (
    <div
      className={styles.container}
      onClick={(e) =>
        typeof onClick === 'function' ? onClick(e, collect) : ''
      }
    >
      {/* 左侧内容区域 */}
      <section className={styles.left_content_box}>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </section>
      {/* 事件和来源 */}

      <section className={styles.evnet_origin_box}>
        <p className={styles.time}>{time}</p>
        <p className={styles.quote_text}>来自: {origin}</p>
      </section>
    </div>
  );
}
