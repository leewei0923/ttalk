import { Button, Switch } from '@arco-design/web-react';
import { IconRight } from '@arco-design/web-react/icon';
import React from 'react';
import styles from './friendSetting.module.scss';

export function FriendSetting(): JSX.Element {
  return (
    <div className={styles.container}>
      <h3 className={styles.setting_title}>好友设置</h3>

      <div className={styles.items}>
        <div className={styles.item}>
          <p>聊天记录</p>
          <IconRight style={{ fontSize: 20 }} />
        </div>

        <div className={styles.item}>
          <p>拉黑</p>
          <Switch size="small" />
        </div>

        <div className={styles.item}>
          <p>消息免打扰</p>
          <Switch size="small" />
        </div>

        <div className={styles.item}>
          <p>置顶聊天</p>
          <Switch size="small" />
        </div>

        <div className={styles.clear_btn}>清除聊天记录</div>

        <Button type="primary" status="danger" shape='round'>
          删除
        </Button>
      </div>
    </div>
  );
}
