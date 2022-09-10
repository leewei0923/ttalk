import { IconPlus, IconSearch } from '@arco-design/web-react/icon';
import React from 'react';
import styles from './chatPage.module.scss';

export function ChatPageTopBar(): JSX.Element {
  return (
    <div className={styles.container}>


      {/* 搜索框 */}
      <div className={styles.search_box}>
        <div className={styles.search_input_box}>
          <input
            type="text"
            name="search_text"
            className={styles.search_text_input}
          />
          <div className={styles.icon_search}>
            <IconSearch style={{ width: '24px' }} />
            <p>搜索</p>
          </div>
        </div>

        <div className={styles.plus_btn_box}>
          <IconPlus style={{ width: '25px' }} />
        </div>
      </div>
    </div>
  );
}
