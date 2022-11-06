import React from 'react';
import { ContcatSumaryCard } from '../contactSumaryCard/contactSummaryCard';
import styles from './chatConcatList.module.scss';

export function ChatConcatList(): JSX.Element {
  const data = new Array(10).fill(0);
  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        return (
          <ContcatSumaryCard
            avatarUrl="https://p3-passport.byteimg.com/img/user-avatar/b3db425b897f2bd8f531a49d53dba24b~100x100.awebp"
            nickname="小明"
            message="小明: 你好"
            time="12:06"
            key={`card${index}`}
          />
        );
      })}
    </div>
  );
}
