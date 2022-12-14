/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable indent */
import React, { useEffect, useRef, useState } from 'react';
import { leftTabOptions } from './leftOptions';
import styles from './chatPageLeftBar.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
// import { useAppSelector } from '@src/redux/hook';
// import { selectGlobalAccount } from '@src/redux/account/index';
import { GetTtakLoginUser } from '@src/common/personInfo';
import { Avatar } from '@arco-design/web-react';
import { firstValidNumber } from '@src/util/util';
import { LeftUserCard } from './leftUserCard/leftUserCard';
import { MoodDataType } from '@src/common/data';
import { GetMood, getMoodType, SetMood } from '@src/common/handleMood';
import { useSocket } from '@src/contexts/socket';
import { apiOfflineEvents, LoadLastestMessage } from '@src/api/chat';
import { OFFLINE_EVENTS } from './handleOfflineEvents';

export function ChatPageLeftBar(): JSX.Element {
  const [curentTabr, setCurrentTab] = useState(0);
  const navigateTo = useNavigate();
  // const globalAccount = useAppSelector(selectGlobalAccount);
  const { chatId } = useParams();
  const userInfoData = GetTtakLoginUser();
  const socket = useSocket();
  if (typeof userInfoData !== 'object') return <></>;

  const onSwitchTab = function (index: number, path: string): void {
    setCurrentTab(index);
    navigateTo(path);
  };

  /**
   * 关闭leftuserCard
   */
  const [leftUserFlag, setLeftUserFlag] = useState(true);

  /**
   * 改变心情
   */
  const [leftBarMood, setLetfBarMood] = useState<getMoodType | ''>('');
  const onChangeMood = (mood: MoodDataType | undefined | ''): void => {
    if (typeof userInfoData !== 'object') return;

    if (mood !== undefined && mood !== '') {
      SetMood({ account: userInfoData[0].account, type: mood.type });
      setLetfBarMood(GetMood());
    }
  };

  const firstLoadRef = useRef(false);
  const onLoadOfflineInfo = (): void => {
    apiOfflineEvents({ account: userInfoData[0].account })
      .then((res) => {
        if (res.code === 200) {

          onHandleEvent(res.info);
        }
      })
      .catch((err) => {
        console.log('出现问题', err);
      });
  };

  const onHandleEvent = (data: LoadLastestMessage[]): void => {
    for (let i = 0; i < data.length; i++) {
      const {
        user_account,
        friend_account,
        create_time,
        event_type,
        event_detail
      } = data[i];
      const offlineEvent = OFFLINE_EVENTS[event_type]();
      offlineEvent.handleEvent({
        user_account,
        friend_account,
        create_time,
        event_detail
      });
    }
  };

  useEffect(() => {
    if (leftBarMood === '') {
      setLetfBarMood(GetMood());
    }

    if (!firstLoadRef.current) {
      onLoadOfflineInfo();
      firstLoadRef.current = true;
    }

    return () => {
      // 页面卸载后移除socket监听
    };
  }, [leftBarMood, socket]);


  
  return (
    <div className={styles.container}>
      {/* 头像 */}
      <div className={styles.avatar_box} onClick={() => setLeftUserFlag(false)}>
        <Avatar
          style={{ backgroundColor: '#165DFF' }}
          autoFixFontSize={false}
          size={50}
          shape="square"
        >
          {typeof userInfoData[0] === 'object' &&
          (userInfoData[0]?.avatar ?? '').length > 5 ? (
            <img src={userInfoData[0]?.avatar} className={styles.avatar_img} />
          ) : (
            firstValidNumber([
              (userInfoData[0]?.nickname ?? '').charAt(0),
              (userInfoData[0]?.account ?? '').charAt(0)
            ])
          )}
        </Avatar>

        <div className={styles.current_mood}>
          {typeof leftBarMood === 'object' ? (
            <img src={leftBarMood.element} />
          ) : (
            ''
          )}
        </div>
      </div>

      <div className={styles.options_container}>
        {leftTabOptions.map((item, index) => {
          return (
            <section
              className={`${styles.left_nav_btn_box} ${
                item.sign === (chatId ?? leftTabOptions[curentTabr])
                  ? styles.isSlected
                  : ''
              }`}
              key={item.name}
              onClick={() => onSwitchTab(index, item.path)}
            >
              {/* <IconMessage style={{ width: '30px', strokeWidth: 3 }} /> */}
              {item.icon}
              <p>{item.name}</p>
            </section>
          );
        })}
      </div>

      <div style={{ visibility: leftUserFlag ? 'hidden' : 'visible' }}>
        <div
          className={styles.mask_user_card}
          onClick={() => setLeftUserFlag(true)}
        ></div>
        <LeftUserCard onclick={onChangeMood} />
      </div>
    </div>
  );
}
