import { Message } from '@arco-design/web-react';
import React, { useEffect } from 'react';
import Storage from '@src/util/localStorage';
import { useNavigate } from 'react-router-dom';
import { userInfoType } from '@src/types';

interface AuthRouteProps {
  element: JSX.Element;
}

export function AuthRoute(props: AuthRouteProps): React.ReactElement {
  const { element } = props;
  const localStorage = new Storage();

  const userInfoStr = localStorage.getStorage('chat-user-info');

  const ttakLoginUser: userInfoType[] | '' =
    userInfoStr === '' ? '' : JSON.parse(userInfoStr);

  const navigate = useNavigate();

  useEffect(() => {
    if (ttakLoginUser === '') {
      Message.warning('未登录，将跳转到登录页面');
      navigate('/login/in');
    }
  }, [ttakLoginUser]);

  return element;
}
