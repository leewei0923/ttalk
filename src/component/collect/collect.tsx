import { GetTtakLoginUser } from '@src/common/personInfo';
import { collect_data_entry } from '@src/database/db';
import { HandleCollectDB } from '@src/database/hanleDbService';
import React, { useEffect, useState } from 'react';
import MyEditor from '../NotePage/Editor/editor';
import styles from './collect.module.scss';
import { CollectBox } from './collectBox/collectBox';
import { CollectMenu } from './collectMenu/collectMenu';
import { CollectMenuType } from './types';

export function Collect(): JSX.Element {
  /**
   * 公共区域
   */
  const handleCollectDB = new HandleCollectDB();

  // ============================
  /**
   * 菜单点击事件
   */

  const [noteMenuType, setNoteMenuType] = useState<CollectMenuType>(
    CollectMenuType.ALLCOLLECT
  );
  const onChangeMenu = (type: CollectMenuType): void => {
    setNoteMenuType(type);
  };
  const loginUser = GetTtakLoginUser();
  if (loginUser === '') return <></>;

  const [collectData, setCollectData] = useState<collect_data_entry[]>([]);

  function init(): void {
    if (loginUser === '') return;
    handleCollectDB
      .load(loginUser[0].account)
      .then((res) => {
        setCollectData(res);
      })
      .catch((err) => console.log('查找出错', err));
  }

  function onMenuChange(): void {
    if (loginUser === '') return;
    handleCollectDB
      .load(loginUser[0].account, noteMenuType)
      .then((res) => {
        setCollectData(res);
      })
      .catch((err) => console.log('查找出错', err));
  }

  useEffect(() => {
    if (collectData.length <= 0) {
      init();
    }

    onMenuChange();
  }, [noteMenuType]);

  return (
    <div className={styles.container}>
      <CollectMenu onClick={onChangeMenu} />
      <CollectBox menuType={noteMenuType} collectData={collectData} />

      <div className={styles.editor_box}>
        <MyEditor />
      </div>
    </div>
  );
}
