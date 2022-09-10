import { LoginBox } from '@src/component/login/loginBox';
import React from 'react';
import styles from './loginPage.module.scss';

function LoginPage(): JSX.Element {
  return <div className={styles.container}>
    <LoginBox />
  </div>;
}

export default LoginPage;
