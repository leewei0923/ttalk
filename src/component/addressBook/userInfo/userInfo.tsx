/* eslint-disable indent */
import {
  IconGithub,
  IconQq,
  IconTwitter,
  IconWechat,
  IconWeibo
} from '@arco-design/web-react/icon';
import { getDiffTime } from '@src/util/handleTime';
import React, { useState } from 'react';
import { PhotoPlayer } from '../photoPlayer/photoPlayer';
import { handleInfo, handleInfoRes } from './handleInfo';
import { useDispatch } from 'react-redux';
import { setGlobalAccount } from '@src/redux/account';
import styles from './userInfo.module.scss';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@arco-design/web-react';
import hui from '@pic/pic/anhui.jpg';
import tu1 from '@src/images/pic/422da67afafb403ca858731cef218324.jpeg';
import tu2 from '@pic/pic/tu.jpg';
import dayjs from 'dayjs';
import { db } from '@src/database/db';

interface userInfoType {
  account: string;
}

export function UserInfo(props: userInfoType): JSX.Element {
  /**
   * 公共区域
   */
  const { account } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const curDate = dayjs().format('YYYY-MM-DD HH:mm');

  const [userInfoData, setUserInfoData] = useState<handleInfoRes>();
  void handleInfo(account).then((res) => {
    setUserInfoData(res);
  });

  // ===================

  // 发送消息的点击事件

  const onSendToOne = (): void => {
    db.concatList
      .where({ friend_account: account })
      .toArray()
      .then((res) => {
        if (res.length <= 0) {
          db.concatList
            .add({
              friend_account: account,
              create_time: curDate,
              update_time: curDate,
              message_count: 0
            })
            .catch((err) => console.log('添加失败', err));
        } else {
          db.concatList
            .where({ friend_account: account })
            .modify({
              update_time: curDate
            })
            .catch((err) => console.log('更新失败', err));
        }
      })
      .catch((err) => console.log('查找失败失败', err));

    navigate('/chat/message');
    dispatch(setGlobalAccount(account));
  };

  return (
    <div className={styles.container}>
      <section className={styles.user_info_container}>
        <div className={styles.user_info_card}>
          <div className={styles.avatar_nickname_box}>
            {typeof userInfoData?.avatar === 'string' &&
            userInfoData?.avatar !== '' ? (
              <img src={userInfoData?.avatar} className={styles.avatar_img} />
            ) : (
              <Avatar
                style={{ backgroundColor: '#EA4335' }}
                autoFixFontSize={false}
                size={90}
                shape="circle"
              >
                {(userInfoData?.nickname ?? '').length > 0
                  ? (userInfoData?.nickname ?? '')?.charAt(0)
                  : account?.charAt(0)}
              </Avatar>
            )}

            <p className={styles.nickname}>
              {typeof userInfoData === 'object' &&
              userInfoData?.nickname.length > 1
                ? userInfoData?.nickname
                : account}
            </p>
            <button className={styles.send_btn} onClick={() => onSendToOne()}>
              发消息
            </button>
          </div>

          <div className={styles.account_birthday_year}>
            <div className={styles.info_list_box}>
              <p className={styles.user_title}>账号：</p>
              <p className={styles.info_list_title}>{account}</p>
            </div>

            <div className={styles.info_list_box}>
              <p className={styles.user_title}>备注：</p>
              <p className={styles.info_list_title}>
                {typeof userInfoData === 'object' ? userInfoData?.remark : '无'}
              </p>
            </div>

            <div className={styles.info_list_box}>
              <p className={styles.user_title}>生日：</p>
              <p className={styles.info_list_title}>
                {typeof userInfoData === 'object'
                  ? userInfoData?.bird_date
                  : ''}
              </p>
            </div>

            <div className={styles.info_list_box}>
              <p className={styles.user_title}>X龄：</p>
              <p className={styles.info_list_title}>
                {typeof userInfoData === 'object'
                  ? getDiffTime('year', userInfoData.add_time)
                  : ''}
              </p>
            </div>

            <div className={styles.social_icon_container}>
              <IconQq style={{ width: 20 }} />
              <IconTwitter style={{ width: 20 }} />
              <IconWechat style={{ width: 20 }} />
              <IconGithub style={{ width: 20 }} />
              <IconWeibo style={{ width: 20 }} />
            </div>
          </div>
        </div>

        <div className={styles.ser_info_talk}>
          <h3 className={styles.ser_info_talk_title}>个性签名：</h3>
          <div className={styles.ser_info_talk_text}>
            {typeof userInfoData === 'object' ? userInfoData?.motto : ''}
          </div>
          <div className={styles.user_account_text}>@{account}</div>
        </div>
      </section>

      <section className={styles.hometown_photo_container}>
        <div className={styles.hometown}>
          <img src={hui} className={styles.hometown_img} />
        </div>
        <div className={styles.photo_box}>
          <PhotoPlayer src={[tu1, tu2]} />
        </div>
      </section>
    </div>
  );
}
