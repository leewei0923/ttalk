import React from 'react';
import styles from './index.module.scss'

export function Loading(): JSX.Element {
  return (
    <div className={styles.loding}>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}
