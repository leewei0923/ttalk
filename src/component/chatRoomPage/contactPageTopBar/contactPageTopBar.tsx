import { IconFindReplace, IconMore } from '@arco-design/web-react/icon';
import React from 'react';
import styles from './contactPageTopBar.module.scss';

export function ContactPageTopBar(): JSX.Element {
  return (
    <div className={styles.container}>
      <p className={styles.nickaname}>小存</p>

      <div className={styles.option_icons}>
        <IconFindReplace style={{ width: '25px', strokeWidth: 2 }} />
        <IconMore style={{ width: '28px', strokeWidth: 2 }} />
      </div>
    </div>
  );
}
