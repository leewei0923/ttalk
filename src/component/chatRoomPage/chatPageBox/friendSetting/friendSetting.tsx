/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Button, Checkbox, Modal, Switch, Tag } from '@arco-design/web-react';
import { IconRight } from '@arco-design/web-react/icon';
import { apiAddFriendBlackList } from '@src/api/chat';
import { chat_user_concat_entry, db } from '@src/database/db';
import { selectGlobalAccount, setGlobalAccount } from '@src/redux/account';
import { useAppSelector } from '@src/redux/hook';
import Storage from '@src/util/localStorage';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './friendSetting.module.scss';
import { deleteUser, deleteUserChatRecord, onDeleteList } from './handleDelete';

interface friendSettingProps {
  loginAccount: string;
  visibleFlag: boolean;
  setVisibleFlag: () => void;
  onChatCloud: () => void;
  onRefreshConcat: () => void;
}

export function FriendSetting(props: friendSettingProps): JSX.Element {
  const { visibleFlag, loginAccount, onChatCloud, onRefreshConcat } = props;
  const globalAccount = useAppSelector(selectGlobalAccount);
  const dispatch = useDispatch();
  const localStorage = new Storage();

  const container = classnames({
    [styles.container]: true,
    [styles.container_selected]: visibleFlag
  });

  interface otherOptionsType {
    name: 'notdisturb' | 'topone';
    state: boolean;
  }
  const [friendConcat, setFriendConcat] = useState<chat_user_concat_entry>();
  const [otherOptions, setOtherOptions] = useState<otherOptionsType[]>([]);
  // const friendConcatRef = useRef<chat_user_concat_entry>();
  const init = async (): Promise<void> => {
    const friendRes = await db.friends
      .where(['friend_account', 'type'])
      .equals([globalAccount, 'accept'])
      .first();

    if (friendRes !== undefined) {
      setFriendConcat(friendRes);
      // friendConcatRef.current = friendRes;
    } else {
      setFriendConcat(undefined);
    }

    const others: otherOptionsType[] = [];
    others[0] = {
      name: 'notdisturb',
      state: searchOne('chat_notdisturb', globalAccount)
    };

    others[1] = {
      name: 'topone',
      state: searchOne('chat_top_chatlist', globalAccount)
    };

    setOtherOptions(others);
  };

  /**
   * 寻找是否存在置顶或者免打扰
   * @param storage storage名称
   * @param account 当前账号
   * @returns
   */
  function searchOne(storage: string, account: string): boolean {
    const res = localStorage.getStorage(storage);
    if (res === '') return false;

    const list = JSON.parse(res);
    for (let i = 0; i < list.length; i++) {
      if (list[0] === account) {
        return true;
      }
    }

    return false;
  }

  /// ==============================
  // 拉进黑名单
  const onInBlacklist = (check: boolean): void => {
    if (friendConcat !== undefined) {
      const concatFr = friendConcat;
      apiAddFriendBlackList({
        user_account: loginAccount,
        friend_account: globalAccount,
        blacklist: concatFr.blacklist
      })
        .then((res) => {
          if (res.code === 200) {
            db.friends
              .where(['friend_account', 'type'])
              .equals([globalAccount, 'accept'])
              .modify({ blacklist: !concatFr.blacklist })
              .catch((err) => {
                console.log('拉黑名单出错', err);
              });
          }
        })
        .catch((err) => {
          console.log('请求出现问题', err);
        });
    }
  };

  // 消息免打扰
  const onNotDisturb = (check: boolean): void => {
    const disturb = localStorage.getStorage('chat_notdisturb');
    let list: string[];

    if (check) {
      if (disturb === '') {
        list = [globalAccount];
      } else {
        list = JSON.parse(disturb);
        list.push(globalAccount);
      }
    } else {
      list = JSON.parse(disturb);
      for (let i = 0; i < list.length; i++) {
        list.splice(i, 1);
      }
    }

    localStorage.setStorage('chat_notdisturb', JSON.stringify(list));
  };

  // 置顶聊天
  const onSetTopMessage = (check: boolean): void => {
    const disturb = localStorage.getStorage('chat_top_chatlist');
    let list: string[];

    if (check) {
      if (disturb === '') {
        list = [globalAccount];
      } else {
        list = JSON.parse(disturb);
        list.push(globalAccount);
      }
    } else {
      list = JSON.parse(disturb);
      for (let i = 0; i < list.length; i++) {
        list.splice(i, 1);
      }
    }

    localStorage.setStorage('chat_top_chatlist', JSON.stringify(list));
  };

  const OPTIONS = [
    {
      key: 'list',
      name: '删除列表'
    },
    {
      key: 'user',
      name: '删除好友'
    },
    {
      key: 'reord',
      name: '删除聊天记录'
    }
  ];
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteList, setDeleteList] = useState<React.ReactText[]>([]);
  const onDeleteUser = (): void => {
    if (deleteList.includes('list')) {
      onDeleteList(globalAccount);
    }

    if (deleteList.includes('user')) {
      deleteUser(loginAccount, globalAccount);
    }

    if (deleteList.includes('record')) {
      deleteUserChatRecord(loginAccount, globalAccount);
    }

    setDeleteModal(false);
    if (typeof onRefreshConcat === 'function') {
      onRefreshConcat();
    }
    dispatch(setGlobalAccount(''));
  };

  const onCheckBoxChange = (list: React.ReactText[]): void => {
    setDeleteList(list);
  };

  const options = [
    {
      title: '拉黑',
      element: (
        <Switch
          size="small"
          defaultChecked={friendConcat?.blacklist}
          onChange={onInBlacklist}
          key={JSON.stringify(friendConcat?.blacklist)}
          disabled={loginAccount === globalAccount}
        />
      )
    },
    {
      title: '消息免打扰',
      element: (
        <Switch
          key={`${loginAccount === globalAccount}disturb`}
          size="small"
          onChange={onNotDisturb}
          defaultChecked={otherOptions[0]?.state ?? false}
          disabled={loginAccount === globalAccount}
        />
      )
    },
    {
      title: '置顶聊天',
      element: (
        <Switch
          size="small"
          onChange={onSetTopMessage}
          defaultChecked={otherOptions[1]?.state ?? false}
          key={`${loginAccount === globalAccount}topone`}
        />
      )
    }
  ];

  useEffect(() => {
    if (globalAccount !== '') {
      void init();
    }
  }, [globalAccount]);

  return (
    <div className={container}>
      <section className={styles.setting_container}>
        <h3 className={styles.setting_title}>好友设置</h3>

        <div className={styles.items}>
          <div className={styles.item} onClick={onChatCloud}>
            <p>好友词云</p>
            <IconRight style={{ fontSize: 20 }} />
          </div>

          {options.map((item, index) => {
            return (
              <div className={styles.item} key={item.title + index.toString()}>
                <p>{item.title}</p>
                {item.element}
              </div>
            );
          })}

          <Button
            type="primary"
            status="danger"
            shape="round"
            onClick={() => setDeleteModal(true)}
          >
            删除
          </Button>
        </div>
      </section>

      <Modal
        title="删除?"
        visible={deleteModal}
        onOk={() => onDeleteUser()}
        onCancel={() => setDeleteModal(false)}
        autoFocus={false}
        focusLock={true}
      >
        <Checkbox.Group
          direction="vertical"
          defaultValue={[]}
          onChange={(e) => onCheckBoxChange(e)}
        >
          {OPTIONS.map((item) => {
            return (
              <Checkbox key={item.key} value={item.key}>
                {({ checked }) => {
                  return (
                    <Tag
                      key={item.key + 'tag'}
                      color={checked ? 'arcoblue' : ''}
                    >
                      {item.name}
                    </Tag>
                  );
                }}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </Modal>
    </div>
  );
}
