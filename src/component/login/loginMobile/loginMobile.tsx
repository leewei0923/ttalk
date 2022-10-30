import React, { useRef } from 'react';
import { HomeHeader } from '@src/component/home/homeHeader/homeHeader';
import styles from './loginMobile.module.scss';
import { LengthValid, RegEXPValid } from '@src/util/valid';
import { Message } from '@arco-design/web-react';
import Storage from '@src/util/localStorage';
import { apiLogin } from '@src/api/login';
import { useNavigate } from 'react-router-dom';

export function LoginMobile(): JSX.Element {
  /**
   * 公共区域
   */
  const navigate = useNavigate();
  const localStorage = new Storage();

  // -------------------

  const accountRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  const onSubmit = (): void => {
    const reg = /^[A-Za-z0-9]+$/g;
    const account = accountRef.current?.value;
    const pwd = pwdRef.current?.value;

    if (!RegEXPValid(reg, account ?? '') || !RegEXPValid(reg, pwd ?? '')) {
      Message.error('账号密码必须是数字和字母');
      return;
    } else if (!LengthValid(account ?? '', 5, 16)) {
      Message.error('账号长度在5-16内');
      return;
    } else if (!LengthValid(pwd ?? '', 8, 20)) {
      Message.error('密码长度在8-20内');
      return;
    }

    void apiLogin({ account, password: pwd, origin: 'ttalk' }).then(
      (res: any) => {
        const { msg, status, userInfo, token } = res.data.data;

        if (status === 'ok') {
          Message.success(msg);

          localStorage.setStorage('chat-user-info', JSON.stringify(userInfo));
          localStorage.setStorage('chat-user-token', token, true);
          navigate('/chat/message');
        } else {
          Message.error(msg);
        }
      }
    );
  };

  return (
    <div className={styles.container}>
      <HomeHeader />

      <div className={styles.login_container}>
        <h2 style={{ fontSize: '1.5rem', letterSpacing: '4px' }}>账号登录</h2>

        <div className={styles.form_box}>
          <input
            type="text"
            placeholder="账号"
            name="account"
            className={styles.input_item}
            pattern="^[A-Za-z0-9]+$"
            ref={accountRef}
          />
          <input
            type="password"
            placeholder="密码"
            name="password"
            className={styles.input_item}
            pattern="^\w+$"
            ref={pwdRef}
          />

          <div className={styles.other_box}>
            <span>忘记密码?</span>
            <span>注册账号?</span>
          </div>

          <button className={styles.login_btn} onClick={() => onSubmit()}>
            登录
          </button>
        </div>
      </div>
    </div>
  );
}
