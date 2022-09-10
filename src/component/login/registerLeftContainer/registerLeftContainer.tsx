import React from 'react';
import classnames from 'classnames';
import styles from './register.module.scss';

interface LoginLeftContainerProps {
  registerFlag: boolean;
}

export function RegisterLeftContainer(
  props: LoginLeftContainerProps
): JSX.Element {
  const { registerFlag } = props;

  const defaultClassOptions = {
    container: classnames({
      [styles.container]: true,
      [styles.switch_register_left]: registerFlag
    })
  };

  return (
    <div className={defaultClassOptions.container}>
      <h2>注册 / REGISTER</h2>
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

      <input
        placeholder="确认密码"
        type="password"
        name="enterPassword"
        className={styles.login_password}
      />

      <button className={styles.login_btn}>登录</button>
    </div>
  );
}
