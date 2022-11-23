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

/**
 * 获取全局的心情
 */

// 心情列表
export enum MoodTypes {
  FaceWithSmilingEyes,
  smilingFaceWithSmilingEyes,
  loudlyCryingFace,
  pleadingFace,
  expressionlessFace,
  worriedFace
}
export interface GlobalMoodType {
  account: string;
  creteTime: string;
  expireTime: string;
  type: string;
}

export const GetTtakMood = function (): GlobalMoodType | '' {
  const moodString = localStorage.getStorage('moodOptions');
  return moodString === '' ? '' : JSON.parse(moodString);
};
