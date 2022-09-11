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
    icon: <IconMessage style={{ width: '30px', strokeWidth: 3 }} />,
    route: ''
  },
  {
    name: '通讯录',
    icon: <IconUserGroup style={{ width: '30px', strokeWidth: 3 }} />,
    route: ''
  },
  {
    name: '应用',
    icon: <IconCommon style={{ width: '30px', strokeWidth: 3 }} />,
    route: ''
  },
  {
    name: '我的',
    icon: <IconUser style={{ width: '30px', strokeWidth: 3 }} />,
    route: ''
  },
  {
    name: '收藏',
    icon: <IconStar style={{ width: '30px', strokeWidth: 3 }} />,
    route: ''
  }
];
