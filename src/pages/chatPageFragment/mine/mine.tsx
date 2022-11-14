/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Modal,
  Avatar,
  Message
} from '@arco-design/web-react';
import {
  IconEdit,
  IconGithub,
  IconQq,
  IconTwitter,
  IconWechat,
  IconWeibo
} from '@arco-design/web-react/icon';
import styles from './mine.module.scss';
import Storage from '@src/util/localStorage';
import { apiUpdateUserInfo } from '@src/api/user';
import { GetTtakLoginUser } from '@src/common/personInfo';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface UserInfoType {
  account: string;
  openid: string;
  social: string;
  motto: string;
  bird_date: string;
  add_time: string;
  nickname: string;
}

function Mine(): JSX.Element {
  const userInfoRef = useRef<UserInfoType>();
  if (GetTtakLoginUser() === '') return <></>;

  /**
   * 公共区域
   */

  const localstorage = new Storage();
  // const { form } = Form.useFormContext();

  // ===============

  /**
   * 初始渲染页面元素
   */
  const getInitData = (): void => {
    const userInfo = GetTtakLoginUser();

    if (userInfo !== '') {
      userInfoRef.current = userInfo[0];
    }
  };
  getInitData();

  /**
   * 点击保存提交
   * @param forms
   */
  const onSubmit = (forms: any): void => {
    const {
      avatar,
      bird_date,
      githubAccount,
      motto,
      nickname,
      qqAccount,
      twitterAccount,
      weChatAccount,
      weiboAccount
    } = forms;
    const social = JSON.stringify({
      social_account: {
        github: githubAccount,
        qq: qqAccount,
        twitter: twitterAccount,
        wechat: weChatAccount,
        weibo: weiboAccount
      }
    });
    apiUpdateUserInfo({
      account: userInfoRef.current?.account ?? '',
      avatar: avatar ?? '',
      bird_date: bird_date ?? '',
      motto: motto ?? '',
      nickname: nickname ?? '',
      social: social ?? ''
    })
      .then((res) => {
        if (res.code === 200) {
          Message.success('保存成功');

          localstorage.setStorage(
            'chat-user-info',
            JSON.stringify([
              {
                account: userInfoRef.current?.account ?? '',
                avatar: avatar ?? '',
                bird_date: bird_date ?? '',
                motto: motto ?? '',
                nickname: nickname ?? '',
                social: social ?? '',
                add_time: userInfoRef.current?.add_time
              }
            ])
          );
        }
      })
      .catch((err) => {
        Message.error('遇到了一些小问题');
        console.log('出错了', err);
      });

    // form.submit();
  };

  // upload

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <section className={styles.base_info_contaienr}>
        <Form
          autoComplete="off"
          onSubmit={onSubmit}
          initialValues={{
            nickname: userInfoRef.current?.nickname,
            bird_date: userInfoRef.current?.bird_date,
            motto: userInfoRef.current?.motto
          }}
        >
          <div className={styles.wrapper_container}>
            <section className={styles.left_container}>
              <FormItem wrapperCol={{ offset: 10 }} field="avatar">
                <Avatar
                  size={80}
                  triggerIcon={<IconEdit />}
                  autoFixFontSize={true}
                  style={{ backgroundColor: '#3370ff' }}
                >
                  {userInfoRef.current?.account
                    .substring(0, 1)
                    .toLocaleUpperCase()}
                </Avatar>
              </FormItem>

              <FormItem label="账号" wrapperCol={{ span: 16 }}>
                <p>{userInfoRef.current?.account}</p>
              </FormItem>

              <FormItem label="昵称" wrapperCol={{ span: 16 }} field="nickname">
                <Input placeholder="请输入你的昵称" />
              </FormItem>

              <FormItem
                label="生日"
                wrapperCol={{ span: 16 }}
                field="bird_date"
              >
                <DatePicker />
              </FormItem>

              <FormItem label="注册时间" wrapperCol={{ span: 16 }}>
                <p>{userInfoRef.current?.add_time.split('T')[0]}</p>
              </FormItem>

              <FormItem label="X龄">
                <p>1年</p>
              </FormItem>
            </section>

            <section className={styles.right_container}>
              <FormItem label="QQ" wrapperCol={{ span: 15 }} field="qqAccount">
                <Input suffix={<IconQq />} placeholder="QQ账号" />
              </FormItem>

              <FormItem
                label="微信"
                wrapperCol={{ span: 15 }}
                field="weChatAccount"
              >
                <Input suffix={<IconWechat />} placeholder="微信账号" />
              </FormItem>

              <FormItem
                label="推特"
                wrapperCol={{ span: 15 }}
                field="twitterAccount"
              >
                <Input suffix={<IconTwitter />} placeholder="Twitter地址" />
              </FormItem>

              <FormItem
                label="GITHUB"
                wrapperCol={{ span: 15 }}
                field="githubAccount"
              >
                <Input suffix={<IconGithub />} placeholder="Github地址" />
              </FormItem>

              <FormItem
                label="Weibo"
                wrapperCol={{ span: 15 }}
                field="weiboAccount"
              >
                <Input suffix={<IconWeibo />} placeholder="微博地址" />
              </FormItem>

              <FormItem
                label="个性签名"
                wrapperCol={{ span: 15 }}
                field="motto"
              >
                <TextArea
                  placeholder="你的个性签名"
                  autoSize={{ minRows: 2, maxRows: 3 }}
                  style={{ width: 500 }}
                />
              </FormItem>

              <FormItem
                label="照片墙"
                field="photoWall"
                triggerPropName="fileList"
              >
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
            </section>
          </div>

          <FormItem wrapperCol={{ offset: 10 }}>
            <Button type="primary" htmlType="submit">
              保存信息
            </Button>
          </FormItem>
        </Form>
      </section>
    </div>
  );
}

export default Mine;
