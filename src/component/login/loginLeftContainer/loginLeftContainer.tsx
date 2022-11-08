import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import { QRCodeSVG } from 'qrcode.react';
import styles from './left.module.scss';
import { LengthValid, RegEXPValid } from '@src/util/valid';
import { Message } from '@arco-design/web-react';
import { apiLogin } from '@src/api/login';
import Storage from '@src/util/localStorage';
import { useNavigate } from 'react-router-dom';

interface LoginLeftContainerProps {
  registerFlag: boolean;
}
export function LoginLeftContainer(
  props: LoginLeftContainerProps
): JSX.Element {
  /**
   * 公共区域
   */
  const navigate = useNavigate();
  const localStorage = new Storage();

  // -------------------
  const { registerFlag } = props;

  // classname 设置区域
  const defaultClassOptions = {
    container: classnames({
      [styles.container]: true,
      [styles.switch_register_left]: registerFlag
    })
  };

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
        const { msg, status, userInfo, token } = res;

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

  const [ScanLoginFlag, setScanFlag] = useState(false);
  const onScanLogin = function (): void {
    setScanFlag(!ScanLoginFlag);
  };

  return (
    <div className={defaultClassOptions.container}>
      <h2>登录 / LOGIN</h2>

      {ScanLoginFlag ? (
        <div className={styles.login_qrcode}>
          <div className={styles.mask}>
            <QRCodeSVG value="https://reactjs.org/" />
            <p>10秒后自动刷新</p>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="account"
            placeholder="账号"
            className={styles.login_account}
            ref={accountRef}
          />
          <input
            placeholder="密码"
            type="password"
            name="password"
            className={styles.login_password}
            ref={pwdRef}
          />
        </div>
      )}

      {ScanLoginFlag ? (
        <div>
          <button className={styles.login_btn} onClick={() => onScanLogin()}>
            取消
          </button>
        </div>
      ) : (
        <div>
          <button className={styles.login_btn} onClick={() => onSubmit()}>
            登录
          </button>
          <div className={styles.login_scan_btn} onClick={() => onScanLogin()}>
            扫码登录
          </div>
        </div>
      )}
    </div>
  );
}
