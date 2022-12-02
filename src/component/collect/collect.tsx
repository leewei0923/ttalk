import { Button, Message, Modal } from '@arco-design/web-react';
import { nanoid } from '@reduxjs/toolkit';
import {
  apiDeleteCollect,
  apiInsertCollect,
  apiUpdateCollect
} from '@src/api/collect';
import { GetTtakLoginUser } from '@src/common/personInfo';
import { collect_data_entry } from '@src/database/db';
import { HandleCollectDB } from '@src/database/hanleDbService';
import { Editor } from '@tiptap/react';
import React, { useEffect, useRef, useState } from 'react';
import MyEditor from '../NotePage/Editor/editor';
import styles from './collect.module.scss';
import { CollectBox } from './collectBox/collectBox';
import { CollectMenu } from './collectMenu/collectMenu';
import { CollectShow } from './collectShow/collectShow';
import { CollectMenuType } from './types';

export function Collect(): JSX.Element {
  /**
   * 公共区域
   */
  const handleCollectDB = new HandleCollectDB();
  const [refresh, setRefresh] = useState(0);

  const loginUser = GetTtakLoginUser();
  if (loginUser === '') return <></>;

  // ============================
  /**
   * 菜单点击事件
   */

  const [noteMenuType, setNoteMenuType] = useState<CollectMenuType>(
    CollectMenuType.ALLCOLLECT
  );
  /**
   * 控制菜单的隐藏
   */
  const [noteVisible, setNoteVisible] = useState(false); // 控制编辑框的
  const [visible, setVisible] = useState(false); // 控制整体的隐藏和显示
  const [readVisible, setReadVisible] = useState(false); // 控制阅读隐藏和显示
  const onChangeMenu = (type: CollectMenuType): void => {
    if (type === CollectMenuType.NEWNOTE) {
      setVisible(!visible);
      setNoteVisible(true);
    } else {
      setNoteVisible(false);
    }
    setNoteMenuType(type);
  };

  const [collectData, setCollectData] = useState<collect_data_entry[]>([]);

  function init(): void {
    if (loginUser === '') return;
    handleCollectDB
      .load(loginUser[0].account)
      .then((res) => {
        setCollectData(MySort(res));
      })
      .catch((err) => console.log('查找出错', err));
  }

  /**
   * 点击菜单更新信息
   * @returns
   */
  function onMenuChange(): void {
    if (loginUser === '') return;
    handleCollectDB
      .load(loginUser[0].account, noteMenuType)
      .then((res) => {
        setCollectData(MySort(res) );
      })
      .catch((err) => console.log('查找出错', err));
  }

  /**
   * 点击保存
   */
  const editorRef = useRef<Editor | null>(null); // 保存editor实例
  function onSetEditor(editor: Editor | null): void {
    // 子组件传递editor
    editorRef.current = editor;
  }
  const collectIdRef = useRef<collect_data_entry | null>(null); // collect_id
  const onSave = (): void => {
    console.log(editorRef.current);
    if (editorRef.current !== null) {
      const content = JSON.stringify(editorRef.current.getJSON());

      if (collectIdRef.current === null) {
        const reqObj = {
          collect_id: nanoid(),
          account: loginUser[0].account,
          content,
          origin: '笔记',
          type: 'note'
        };

        apiInsertCollect(reqObj).catch((err) =>
          console.log('保存到网络出错', err)
        );
        handleCollectDB.insert(reqObj);
      } else {
        apiUpdateCollect({
          account: loginUser[0].account,
          collect_id: collectIdRef.current.collect_id,
          content
        }).catch((err) => console.log('保存到网络出错', err));
        const newData = handleCollectDB.update(
          collectIdRef.current.collect_id,
          content,
          collectData
        );
        setCollectData(MySort(newData) );
      }

      Message.info('保存成功');
    }
  };

  const onEdit = (): void => {
    setNoteVisible(true);
    setReadVisible(false);
  };

  // 点击取消
  const onCancel = (): void => {
    setVisible(!visible);
    setNoteVisible(false);
    setReadVisible(false);

    collectIdRef.current = null;
  };

  /**
   * 点击卡片获取相关信息
   */
  const onGetCardInfo = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    collect: collect_data_entry
  ): void => {
    setVisible(true);
    setReadVisible(true);

    collectIdRef.current = collect;
  };

  /**
   * 点击删除
   */
  const [visibleModal, setVisibleModal] = useState(false);
  const onCollectDelete = (): void => {
    if (collectIdRef.current == null) return;
    const collectDb = handleCollectDB.delete(
      collectIdRef.current?.collect_id,
      collectData
    );

    apiDeleteCollect({
      account: loginUser[0].account,
      collect_id: collectIdRef.current.collect_id
    }).catch((err) => console.log('查找出错', err));

    setCollectData(MySort(collectDb));
    setReadVisible(false);
    setVisibleModal(false);
    setVisible(false);
    setRefresh(refresh + 1);
  };

  function MySort(list: collect_data_entry[]): collect_data_entry[] {
    list.sort((a, b) => {
      if (typeof b.id === 'number' && typeof a.id === 'number') {
        return b.id - a.id;
      } else {
        return 0;
      }
    });

    return list;
  }

  useEffect(() => {
    init();

    onMenuChange();
  }, [noteMenuType]);

  return (
    <div className={styles.container}>
      <CollectMenu onClick={onChangeMenu} />
      <CollectBox
        menuType={noteMenuType}
        collectData={collectData}
        onCardClick={onGetCardInfo}
      />

      <div
        className={styles.editor_box}
        style={{ visibility: visible ? 'visible' : 'hidden' }}
      >
        <div
          className={styles.mask}
          onClick={() => {
            onCancel();
          }}
        ></div>
        {noteVisible ? (
          <MyEditor collect={collectIdRef.current} onGetEditor={onSetEditor} />
        ) : (
          ''
        )}

        {readVisible ? <CollectShow collect={collectIdRef.current} /> : ''}

        <div className={styles.right_container}>
          {noteVisible && !readVisible ? (
            <Button
              type="primary"
              shape="round"
              size="large"
              disabled={
                collectIdRef.current?.type !== 'note' &&
                noteMenuType !== 'newNote'
              }
              onClick={() => onSave()}
            >
              保存
            </Button>
          ) : (
            <Button
              type="primary"
              shape="round"
              size="large"
              disabled={collectIdRef.current?.type !== 'note'}
              onClick={() => onEdit()}
            >
              编辑
            </Button>
          )}

          <Button
            type="outline"
            shape="round"
            onClick={() => {
              onCancel();
            }}
          >
            取消
          </Button>

          <Button
            type="outline"
            status="danger"
            shape="round"
            onClick={() => {
              setVisibleModal(true);
            }}
          >
            删除
          </Button>
        </div>
      </div>

      <Modal
        title="删除提示"
        visible={visibleModal}
        onOk={() => onCollectDelete()}
        onCancel={() => setVisibleModal(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>你确定要删除当前收藏的内容吗?</p>
      </Modal>
    </div>
  );
}
