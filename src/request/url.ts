export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/server/'
    : 'https://api.7miaoyu.com/server/note/';

export const uploadURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3001/static/'
    : 'https://api.7miaoyu.com/static/';

export const SOCKET_URL = 'ws://localhost:3102';
