import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import { Message, Modal } from '@arco-design/web-react';
import { apiRegister } from '@src/api/login';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.scss';
import { RegEXPValid, LengthValid } from '@src/util/valid';

interface LoginLeftContainerProps {
  registerFlag: boolean;
}

export function RegisterLeftContainer(
  props: LoginLeftContainerProps
): JSX.Element {
  const { registerFlag } = props;

  /**
   * 公共区域
   */
  const navigate = useNavigate();

  // -------------------

  const defaultClassOptions = {
    container: classnames({
      [styles.container]: true,
      [styles.switch_register_left]: registerFlag
    })
  };

  const accountRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const enterPwdRef = useRef<HTMLInputElement>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const onOk = (): void => {
    setModalVisible(false);
    navigate('/login/in');
  };
  const onSubmit = (): void => {
    const reg = /^[A-Za-z0-9]+$/g;
    const account = accountRef.current?.value;
    const pwd = pwdRef.current?.value;
    const enterPwd = enterPwdRef.current?.value;

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
    if (pwd !== enterPwd) {
      Message.error('两次密码不一致');
      return;
    }

    void apiRegister({ account, password: pwd, origin: 'ttalk' }).then(
      (res: any) => {
        const { msg, status } = res.data.data;

        if (status === 'ok') {
          Message.success(msg);
          setModalVisible(true);
        } else {
          Message.error(msg);
        }
      }
    );
  };

  return (
    <div className={defaultClassOptions.container}>
      <h2>注册 / REGISTER</h2>
      <input
        type="text"
        name="account"
        placeholder="账号"
        className={styles.login_account}
        ref={accountRef}
        required
        pattern="^[A-Za-z0-9]+$"
      />
      <input
        placeholder="密码"
        type="password"
        name="password"
        className={styles.login_password}
        ref={pwdRef}
        required
        pattern="^[A-Za-z0-9]+$"
      />

      <input
        placeholder="确认密码"
        type="password"
        name="enterPassword"
        className={styles.login_password}
        ref={enterPwdRef}
        required
        pattern="^[A-Za-z0-9]+$"
      />

      <button className={styles.login_btn} onClick={() => onSubmit()}>
        注册
      </button>
      <Modal
        title="成功注册,去登录吗?"
        visible={modalVisible}
        onOk={() => onOk()}
        onCancel={() => setModalVisible(false)}
        autoFocus={false}
        focusLock={true}
      ></Modal>
    </div>
  );
}
