import { IconArrowLeft } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react';
import paper_plane from '@pic/pic/paper_plane.png';
import { LoginLeftContainer } from './loginLeftContainer/loginLeftContainer';
import styles from './loginBox.module.scss';
import classnames from 'classnames';
import { RegisterLeftContainer } from './registerLeftContainer/registerLeftContainer';
import { useNavigate, useParams } from 'react-router-dom';

export function LoginBox(): JSX.Element {
  /**
   * 公共区域
   */
  const { nav } = useParams();
  const navigate = useNavigate();

  /**
   * 点击注册的事件
   */
  const [registerFlag, setRegisterFlag] = useState(false);
  const onSwitchRegisterPage = function (): void {
    setRegisterFlag(true);
    navigate("/login/up")
  };

  const onSwitchLoginPage = function (): void {
    setRegisterFlag(false);
    navigate("/login/in")
  };
  /**
   * 合并class名称
   */
  const defaultLoginClassName = {
    left_container: classnames({
      [styles.left_container]: true,
      [styles.switch_register_left]: registerFlag
    }),

    right_container: classnames({
      [styles.right_container]: true,
      [styles.switch_register_right]: registerFlag
    })
  };

  useEffect(() => {
    if (nav === 'in') {
      onSwitchLoginPage();
    } else {
      onSwitchRegisterPage();
    }
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.back_btn_box}>
        <IconArrowLeft />
      </section>

      <section className={styles.login_container}>
        {registerFlag ? (
          <RegisterLeftContainer registerFlag={registerFlag} />
        ) : (
          <LoginLeftContainer registerFlag={registerFlag} />
        )}

        <div className={defaultLoginClassName.right_container}>
          <h2 className={styles.right_container_title}>欢迎登录字学聊天室</h2>
          <p className={styles.right_container_desc}>与好友交流，快乐分享</p>

          <div className={styles.show_img_box}>
            <img src={paper_plane} className={styles.show_img} />
          </div>

          <div className={styles.right_container_options}>
            <p onClick={() => onSwitchLoginPage()}>没有账号?</p>
            <p>忘记密码?</p>
          </div>

          {registerFlag ? (
            <button
              className={styles.go_resister}
              onClick={() => onSwitchLoginPage()}
            >
              去登录
            </button>
          ) : (
            <button
              className={styles.go_resister}
              onClick={() => onSwitchRegisterPage()}
            >
              去注册
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
