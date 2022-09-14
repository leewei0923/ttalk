import React from 'react';
import { Form, Input, Button, Checkbox } from '@arco-design/web-react';
import styles from './mine.module.scss';

const FormItem = Form.Item;

function Mine(): JSX.Element {
  return (
    <div className={styles.container}>
      <section className={styles.base_info_contaienr}>
        <img src={require('@pic/pic/logo.png')} className={styles.avatar_img} />
        <Form style={{ width: 600 }} autoComplete="off">
          <FormItem label="账号">
            <Input placeholder="你的账号" />
          </FormItem>

          <FormItem label="昵称">
            <Input placeholder="请输入你的昵称" />
          </FormItem>

          <FormItem label="生日">
            <Input placeholder="请输入你的昵称" />
          </FormItem>

          <FormItem label="X龄">
            <Input placeholder="请输入你的" />
          </FormItem>

          <FormItem wrapperCol={{ offset: 5 }}>
            <Button type="primary">Submit</Button>
          </FormItem>
        </Form>
      </section>
    </div>
  );
}

export default Mine;
