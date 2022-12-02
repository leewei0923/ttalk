import { collect_data_entry } from '@src/database/db';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { CollectCard } from '../collectCard/collectCard';
import { CollectMenuType } from '../types';
import styles from './collectBox.module.scss';

interface CollectBoxProps {
  menuType: CollectMenuType;
  collectData: collect_data_entry[];
  onCardClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    collect: collect_data_entry
  ) => void;
}

export function CollectBox(props: CollectBoxProps): JSX.Element {
  /**
   * 公共区域
   */
  const { menuType, collectData, onCardClick } = props;

  const topTitleText = {
    allCollect: '所有收藏',
    newNote: '新的笔记',
    note: '我的笔记',
    messageNote: '聊天记录'
  };

  return (
    <div className={styles.container}>
      <div className={styles.top_title}>{topTitleText[menuType]}</div>

      <div className={styles.collect_box}>
        {collectData.map((res) => {
          const htmlContent = generateHTML(JSON.parse(res.content), [
            StarterKit,
            TextStyle,
            Color
          ]);

          return (
            <CollectCard
              key={res.collect_id}
              content={htmlContent}
              time={res.create_time}
              origin={res.origin}
              collect={res}
              onClick={function (
                e: React.MouseEvent<HTMLDivElement, MouseEvent>,
                collect: collect_data_entry
              ): void {
                onCardClick(e, collect);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
