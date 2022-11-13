export interface RequestType {
  code: number;
  extra: Object;
  message: string;
  status: number;
  success: boolean;
}


export interface CommonRes {
  status: 'ok' | 'fail';
  code: number;
  msg: string;
}