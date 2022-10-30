import { HomeHeader } from '@src/component/home/homeHeader/homeHeader';
import React, { useState } from 'react';
import { Form, Input, Button, Message, Modal } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { apiRegister } from '@src/api/login';
import styles from './registerMobile.module.scss';

interface FormContentType {
  account: string;
  pwd: string;
  enterPwd: string;
}

export function RegisterMobile(): JSX.Element {
  /**
   * 公共区域
   */
  const FormItem = Form.Item;
  const navigate = useNavigate();

  // ===========================

  /**
   * 点击注册
   * @param form
   */

  const [modalVisible, setModalVisible] = useState(false);
  const onOk = (): void => {
    navigate('/login/in');
  };
  const onGetAllInputText = (form: FormContentType): void => {
    const { account, pwd, enterPwd } = form;

    if (pwd !== enterPwd) {
      Message.error('确认密码不正确');
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
    <div className={styles.container}>
      <HomeHeader />

      <div className={styles.login_container}>
        <h2 style={{ fontSize: '1.5rem', letterSpacing: '4px' }}>注册账号</h2>
        <Form
          autoComplete="off"
          onSubmit={onGetAllInputText}
          className={styles.form_box}
          validateMessages={{
            string: {
              match: `用户名只支持字母和数字`
            },
            number: {
              min: `最短为 #{min}`,
              max: `最长为 #{max}`
            }
          }}
        >
          <FormItem
            className={styles.form_item}
            wrapperCol={{ offset: 2, xs: 20 }}
            field={'account'}
            required
            rules={[
              {
                type: 'string',
                required: true,
                maxLength: 16,
                minLength: 5,
                match: /^[A-Za-z0-9]+$/
              }
            ]}
          >
            <Input placeholder="账号" className={styles.input_item} />
          </FormItem>

          <FormItem
            className={styles.form_item}
            wrapperCol={{ offset: 2, xs: 20 }}
            field={'pwd'}
            required
            rules={[
              {
                type: 'string',
                required: true,
                maxLength: 20,
                minLength: 8,
                match: /^[A-Za-z0-9]+$/
              }
            ]}
          >
            <Input
              placeholder="密码"
              type="password"
              className={styles.input_item}
            />
          </FormItem>

          <FormItem
            className={styles.form_item}
            wrapperCol={{ offset: 2, xs: 20 }}
            field={'enterPwd'}
            required
            rules={[
              {
                type: 'string',
                required: true,
                maxLength: 20,
                minLength: 8,
                match: /^[A-Za-z0-9]+$/
              }
            ]}
          >
            <Input
              placeholder="确认密码"
              type="password"
              className={styles.input_item}
            />
          </FormItem>

          <FormItem
            className={styles.form_item}
            wrapperCol={{ offset: 7, xs: 10 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_btn}
            >
              注册
            </Button>
          </FormItem>
        </Form>
        <Modal
          title="成功注册,去登录吗?"
          visible={modalVisible}
          onOk={() => onOk()}
          onCancel={() => setModalVisible(false)}
          autoFocus={false}
          focusLock={true}
        ></Modal>
        ;
      </div>
    </div>
  );
}
