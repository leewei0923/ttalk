import { Collect } from '@src/component/collect/collect';
import React from 'react';
import styles from './collectPage.module.scss';

function CollectPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <Collect />
    </div>
  );
}

export default CollectPage;
