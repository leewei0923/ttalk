import { Button } from '@arco-design/web-react';
import {
  IconApps,
  IconBook,
  IconMessage,
  IconPlus
} from '@arco-design/web-react/icon';
import React from 'react';
import { CollectMenuType } from '../types';
import styles from './collectMenu.module.scss';

interface CollectMenuProps {
  onClick: (type: CollectMenuType) => void;
}

export function CollectMenu(props: CollectMenuProps): JSX.Element {
  const { onClick } = props;
  return (
    <div className={styles.container}>
      <Button
        className={styles.main_button}
        icon={<IconPlus className={styles.icon} />}
        onClick={() => typeof onClick === 'function' ? onClick(CollectMenuType.NEWNOTE) : ''}
      >
        新建笔记
      </Button>

      <div className={styles.minor_options_box}>
        <Button
          className={styles.minor_button}
          icon={<IconApps className={styles.icon} />}
          onClick={() => typeof onClick === 'function' ? onClick(CollectMenuType.ALLCOLLECT) : ''}
        >
          全部收藏
        </Button>
        <Button
          className={styles.minor_button}
          icon={<IconBook className={styles.icon} />}
          onClick={() => typeof onClick === 'function' ? onClick(CollectMenuType.NOTE) : ''}
        >
          笔 记
        </Button>
        <Button
          className={styles.minor_button}
          icon={<IconMessage className={styles.icon} />}
          onClick={() => typeof onClick === 'function' ? onClick(CollectMenuType.MESSAGENOTE) : ''}
        >
          聊天记录
        </Button>
      </div>
    </div>
  );
}
