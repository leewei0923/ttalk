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
import styles from './userInfo.module.scss';

interface userInfoType {
  account: string;
}

export function UserInfo(props: userInfoType): JSX.Element {
  /**
   * 公共区域
   */
  const { account } = props;

  const [userInfoData, setUserInfoData] = useState<handleInfoRes>();
  void handleInfo(account).then((res) => {
    setUserInfoData(res);
  });

  // ===================

  return (
    <div className={styles.container}>
      <section className={styles.user_info_container}>
        <div className={styles.user_info_card}>
          <div className={styles.avatar_nickname_box}>
            <img
              src={require('@pic/pic/logo.png')}
              alt="头像"
              className={styles.avatar_img}
            />
            <p className={styles.nickname}>
              {typeof userInfoData === 'object' &&
              userInfoData?.nickname.length > 5
                ? userInfoData?.nickname
                : account}
            </p>
            <button className={styles.send_btn}>发消息</button>
          </div>

          <div className={styles.account_birthday_year}>
            <div className={styles.info_list_box}>
              <p className={styles.user_title}>账号：</p>
              <p className={styles.info_list_title}>{account}</p>
            </div>

            <div className={styles.info_list_box}>
              <p className={styles.user_title}>备注：</p>
              <p className={styles.info_list_title}>
                {typeof userInfoData === 'object' &&
                userInfoData?.nickname.length > 5
                  ? userInfoData?.nickname
                  : '无'}
              </p>
            </div>

            <div className={styles.info_list_box}>
              <p className={styles.user_title}>生日：</p>
              <p className={styles.info_list_title}>
                {typeof userInfoData === 'object' &&
                userInfoData?.nickname.length > 5
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
          <img
            src={require('@pic/pic/anhui.jpg')}
            className={styles.hometown_img}
          />
        </div>
        <div className={styles.photo_box}>
          <PhotoPlayer
            src={[
              require('@pic/pic/422da67afafb403ca858731cef218324.jpeg'),
              require('@pic/pic/tu.jpg')
            ]}
          />
        </div>
      </section>
    </div>
  );
}
