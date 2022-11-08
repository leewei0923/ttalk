import { IconPlus, IconSearch } from '@arco-design/web-react/icon';
import { apiSearchUser } from '@src/api/user';
import classnames from 'classnames';
import React, { useRef, useState } from 'react';
import { AddUser } from './addUser/addUser';
import styles from './chatPage.module.scss';
import { UserCard } from './userCard/userCard';

export function ChatPageTopBar(): JSX.Element {
  const [addBoxFlag, setAddBoxFlag] = useState(false);

  const ClassNames = {
    concat_search: classnames({
      [styles.concat_search]: true,
      [styles.concat_search_close]: addBoxFlag
    })
  };

  /**
   * 搜索用户
   */
  interface searchRes {
    account: string;
    motto: string;
    nickname: string;
    avatar: string;
  }
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchUser, setSearchUser] = useState<searchRes | 'null'>();
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onSearchUser = async () => {
    const searchVal = searchRef.current?.value;
    const searchRes = await apiSearchUser({ account: searchVal ?? '' });
    if (searchRes.code === 200) {
      if (typeof searchRes.user === 'object') {
        setSearchUser(searchRes.user[0]);
      } else {
        setSearchUser('null');
      }
    }
  };
  // ================

  // 点击添加
  const [showApplyHide, setShowApplyHide] = useState(true);

  const onAddUser = (): void => {
    setShowApplyHide(false);
  };

  const onSendMessage = (): void => {};

  /**
   * 获取申请信息
   */
  const onSubmitApply = (value: {
    remark: string;
    verifyInformation: string;
  }): void => {
    setShowApplyHide(true);
    console.log(value);
  };

  return (
    <div className={styles.container}>
      <div className={ClassNames.concat_search}>
        <div className={styles.concat_search_box}>
          <input
            className={styles.add_search_box}
            placeholder="请输入对方账号或昵称搜索"
            ref={searchRef}
          />
          <button
            className={styles.add_search_btn}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => await onSearchUser()}
          >
            搜索
          </button>
        </div>

        {searchUser === 'null' ? (
          <div>无效的用户名</div>
        ) : (
          <UserCard
            motto={searchUser?.motto}
            nickname={searchUser?.nickname}
            avatar={searchUser?.avatar}
            account={searchUser?.account}
            onAddUser={onAddUser}
            onSendMessage={onSendMessage}
            hide={searchUser === undefined}
            buttonState="new"
          />
        )}
      </div>

      <AddUser hide={showApplyHide} onSubmit={onSubmitApply} />

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

        <div
          className={styles.plus_btn_box}
          onClick={() => setAddBoxFlag(!addBoxFlag)}
        >
          <IconPlus
            style={{ width: '25px', strokeWidth: '3px', color: 'white' }}
          />
        </div>
      </div>
    </div>
  );
}
