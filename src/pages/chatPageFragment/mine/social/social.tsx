import React from 'react';
import { Form, Input, Modal, Upload } from '@arco-design/web-react';
import {
  IconGithub,
  IconQq,
  IconTwitter,
  IconWechat,
  IconWeibo
} from '@arco-design/web-react/icon';
import styles from './social.module.scss';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export function Social(props: { getValue: any }): JSX.Element {
  const [form] = Form.useForm();
  const { getValue } = props;

  return (
    <div className={styles.container}>
      <Form
        style={{ width: 600 }}
        autoComplete="off"
        form={form}
        onSubmit={getValue}
      >
        <FormItem label="QQ" wrapperCol={{ span: 15 }} field="qqAccount">
          <Input suffix={<IconQq />} placeholder="QQ账号" />
        </FormItem>

        <FormItem label="微信" wrapperCol={{ span: 15 }} field="weChatAccount">
          <Input suffix={<IconWechat />} placeholder="微信账号" />
        </FormItem>

        <FormItem label="推特" wrapperCol={{ span: 15 }} field="twitterAccount">
          <Input suffix={<IconTwitter />} placeholder="Twitter地址" />
        </FormItem>

        <FormItem
          label="GITHUB"
          wrapperCol={{ span: 15 }}
          field="githubAccount"
        >
          <Input suffix={<IconGithub />} placeholder="Github地址" />
        </FormItem>

        <FormItem label="Weibo" wrapperCol={{ span: 15 }} field="weiboAccount">
          <Input suffix={<IconWeibo />} placeholder="微博地址" />
        </FormItem>

        <FormItem
          label="个性签名"
          wrapperCol={{ span: 15 }}
          initialValue=""
          field="motto"
        >
          <TextArea
            placeholder="你的个性签名"
            autoSize={{ minRows: 2, maxRows: 3 }}
            style={{ width: 500 }}
          />
        </FormItem>

        <FormItem label="照片墙" field="photoWall" triggerPropName="fileList">
          <Upload
            listType="picture-card"
            multiple
            name="files"
            action="/"
            limit={5}
            defaultFileList={[
              {
                uid: '-2',
                name: '20200717-103937.png',
                url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
              },
              {
                uid: '-1',
                name: 'hahhahahahaha.png',
                url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
              }
            ]}
            onPreview={(file) => {
              Modal.info({
                title: 'Preview',
                content: (
                  <img
                    src={file.url ?? ''}
                    style={{
                      maxWidth: '100%'
                    }}
                  ></img>
                )
              });
            }}
          />
        </FormItem>
      </Form>
    </div>
  );
}
