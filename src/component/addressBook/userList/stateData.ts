interface userTyep {
  sign: string;
  children: Array<{
    name: string;
    account: string;
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
        account: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'online'
      },
      {
        name: '小存',
        account: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      },
      {
        name: '伟伟酱',
        account: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'online'
      },
      {
        name: '小里',
        account: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      },
      {
        name: 'xxx先生',
        account: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'online'
      },
      {
        name: '超级无敌长的为昵称,大约有多少个字就你好',
        account: '',
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
        account: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'online'
      },
      {
        name: '小红',
        account: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      },
      {
        name: '小里',
        account: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      },
      {
        name: 'xxx先生',
        account: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'online'
      },
      {
        name: '超级无敌长的为昵称,大约有多少个字就你好',
        account: '',
        avatar_url: require('@pic/pic/logo.png'),
        status: 'offline'
      }
    ]
  }
];
