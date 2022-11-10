export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/server/'
    : 'https://api.7miaoyu.com/server/note/';

export const SOCKET_URL = 'ws://localhost:3102';
