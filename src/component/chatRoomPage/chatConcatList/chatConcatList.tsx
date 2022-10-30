import React from 'react';
import { ContcatSumaryCard } from '../contactSumaryCard/contactSummaryCard';
import styles from './chatConcatList.module.scss';

export function ChatConcatList(): JSX.Element {
  const data = new Array(10).fill(0);
  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        return <ContcatSumaryCard key={`card${index}`} />;
      })}
    </div>
  );
}
