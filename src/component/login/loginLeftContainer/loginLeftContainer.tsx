import React, { useState } from 'react';
import classnames from 'classnames';
import { QRCodeSVG } from 'qrcode.react';
import styles from './left.module.scss';

interface LoginLeftContainerProps {
  registerFlag: boolean;
}
export function LoginLeftContainer(
  props: LoginLeftContainerProps
): JSX.Element {
  const { registerFlag } = props;

  // classname 设置区域
  const defaultClassOptions = {
    container: classnames({
      [styles.container]: true,
      [styles.switch_register_left]: registerFlag
    })
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
          />
          <input
            placeholder="密码"
            type="password"
            name="password"
            className={styles.login_password}
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
          <button className={styles.login_btn}>登录</button>
          <div className={styles.login_scan_btn} onClick={() => onScanLogin()}>
            扫码登录
          </div>
        </div>
      )}
    </div>
  );
}
