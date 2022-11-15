/* eslint-disable react/react-in-jsx-scope */
import {
  IconCommon,
  IconMessage,
  IconStar,
  IconUser,
  IconUserGroup
} from '@arco-design/web-react/icon';

export const leftTabOptions = [
  {
    name: '消息',
    sign: 'message',
    icon: <IconMessage style={{ width: '30px', strokeWidth: 3 }} />,
    path: '/chat/message/'
  },
  {
    name: '通讯录',
    sign: 'addressBook',
    icon: <IconUserGroup style={{ width: '30px', strokeWidth: 3 }} />,
    path: '/chat/addressBook'
  },
  {
    name: '应用',
    sign: 'app',
    icon: <IconCommon style={{ width: '30px', strokeWidth: 3 }} />,
    path: '/chat/app'
  },
  {
    name: '我的',
    sign: 'mine',
    icon: <IconUser style={{ width: '30px', strokeWidth: 3 }} />,
    path: '/chat/mine'
  },
  {
    name: '收藏',
    sign: 'collect',
    icon: <IconStar style={{ width: '30px', strokeWidth: 3 }} />,
    path: '/chat/collect'
  }
];
