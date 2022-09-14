interface userTyep {
  sign: string;
  children: Array<{
    name: string;
    openid: string;
    avatar_url: any;
    status: 'online' | 'offline';
  }>;
}

export const user: userTyep[] = [
  {
    sign: 'A',
    children: [
      {
        name: '伟伟酱',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'online'
      },
      {
        name: '小存',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      },
      {
        name: '伟伟酱',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'online'
      },
      {
        name: '小里',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      },
      {
        name: 'xxx先生',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'online'
      },
      {
        name: '超级无敌长的为昵称,大约有多少个字就你好',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      }
    ]
  },
  {
    sign: 'B',
    children: [
      {
        name: '小黑',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'online'
      },
      {
        name: '小红',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      },
      {
        name: '小里',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      },
      {
        name: 'xxx先生',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'online'
      },
      {
        name: '超级无敌长的为昵称,大约有多少个字就你好',
        openid: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      }
    ]
  }
];
