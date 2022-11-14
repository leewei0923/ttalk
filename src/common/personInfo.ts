import Storage from '@src/util/localStorage';
import { userInfoType } from '@src/types/index';

const localStorage = new Storage();

// string
export const GetTtalkToken = function (): string {
  return localStorage.getStorage('chat-user-token', true);
};

export const GetTtakLoginUser = function (): userInfoType[] | '' {
  const userInfoStr = localStorage.getStorage('chat-user-info');
  return userInfoStr === '' ? '' : JSON.parse(userInfoStr);
};
