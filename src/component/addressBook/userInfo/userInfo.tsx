import {
  IconGithub,
  IconQq,
  IconTwitter,
  IconWechat,
  IconWeibo
} from '@arco-design/web-react/icon';
import React from 'react';
import { PhotoPlayer } from '../photoPlayer/photoPlayer';

import styles from './userInfo.module.scss';

export function UserInfo(): JSX.Element {
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
            <p className={styles.nickname}>伟伟酱</p>
            <button className={styles.send_btn}>发消息</button>
          </div>

          <div className={styles.account_birthday_year}>
            <div className={styles.info_list_box}>
              <p className={styles.user_title}>账号：</p>
              <p className={styles.info_list_title}>leewei</p>
            </div>

            <div className={styles.info_list_box}>
              <p className={styles.user_title}>备注：</p>
              <p className={styles.info_list_title}>小明</p>
            </div>

            <div className={styles.info_list_box}>
              <p className={styles.user_title}>生日：</p>
              <p className={styles.info_list_title}>2022-01-01</p>
            </div>

            <div className={styles.info_list_box}>
              <p className={styles.user_title}>X龄：</p>
              <p className={styles.info_list_title}>1年</p>
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
            我们从何而来,又将走向何处,我们是谁? Who are you?
          </div>
          <div className={styles.user_account_text}>@Leewei</div>
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

          <PhotoPlayer src={[require('@pic/pic/422da67afafb403ca858731cef218324.jpeg'), require('@pic/pic/tu.jpg')]} />
        </div>
      </section>
    </div>
  );
}
