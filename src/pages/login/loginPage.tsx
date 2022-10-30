import { LoginBoxMobile } from '@src/component/login/loginBoxMobile/loginBoxMobile';
import { LoginBox } from '@src/component/login/loginBox';
import React from 'react';
import styles from './loginPage.module.scss';

function LoginPage(): JSX.Element {
  
  return (
    <div className={styles.container}>
      <div className={styles.pc_container}>
        <LoginBox />
      </div>
      <div className={styles.mobile_container}>
        <LoginBoxMobile />
      </div>
    </div>
  );
}

export default LoginPage;
