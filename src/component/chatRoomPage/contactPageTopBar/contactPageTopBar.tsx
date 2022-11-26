import { IconFindReplace, IconMore } from '@arco-design/web-react/icon';
import React from 'react';
import styles from './contactPageTopBar.module.scss';

interface ContactPageTopBarProps {
  nickname: string;
  settingClick: () => void;
}

export function ContactPageTopBar(props: ContactPageTopBarProps): JSX.Element {
  /**
   * 公共区域
   */
  const { nickname, settingClick } = props;

  return (
    <div className={styles.container}>
      <p className={styles.nickaname}>{nickname}</p>

      <div className={styles.option_icons}>
        <div className={styles.icon}>
          <IconFindReplace style={{ width: '25px', strokeWidth: 2 }} />
        </div>

        <div
          className={styles.icon}
          onClick={() => {
            if (typeof settingClick === 'function') {
              settingClick();
            }
          }}
        >
          <IconMore style={{ width: '28px', strokeWidth: 2 }} />
        </div>
      </div>
    </div>
  );
}
