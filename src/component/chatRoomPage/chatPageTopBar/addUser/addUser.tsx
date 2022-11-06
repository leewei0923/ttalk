import { Button, Form, Input } from '@arco-design/web-react';
import React from 'react';
import styles from './addUser.module.scss';

const FormItem = Form.Item;

interface AddUserProps {
  hide?: boolean;
  onSubmit?: (value: { remark: string; verifyInformation: string }) => void;
}

export function AddUser(props: AddUserProps): JSX.Element {
  /**
   * 公共区域
   */
  const { hide, onSubmit } = props;
  
  // ===============

  const onSubmitBtn = (value: {
    remark: string;
    verifyInformation: string;
  }): void => {
    if (typeof onSubmit === 'function') {
      onSubmit(value);
    }
  };

  return (
    <section
      className={styles.add_user_container}
      style={{ visibility: hide === false ? 'visible' : 'hidden' }}
    >
      <h2 className={styles.title}>申请添加朋友</h2>
      <Form
        layout="vertical"
        style={{ width: '230px', marginLeft: '10px', marginTop: '10px' }}
        onSubmit={onSubmitBtn}
      >
        <FormItem
          label="验证信息"
          field={'verifyInformation'}
          wrapperCol={{ span: 15 }}
          rules={[
            {
              type: 'string',
              minLength: 30
            }
          ]}
        >
          <Input placeholder="请输入验证信息" />
        </FormItem>

        <FormItem label="备注" field={'remark'}>
          <Input placeholder="备注" />
        </FormItem>

        <FormItem wrapperCol={{ offset: 7 }}>
          <Button
            style={{ width: '100px' }}
            shape="round"
            type="outline"
            htmlType="submit"
          >
            申请
          </Button>
        </FormItem>
      </Form>
    </section>
  );
}
