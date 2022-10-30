const env = process.env.NODE_ENV;

export interface RequestType {
  status: 'ok' | 'fail';
  code: number;
  msg: string;
}

export const host =
  env === 'development'
    ? 'http://localhost:3001/server'
    : 'https://api.7maioyu.com/server';
