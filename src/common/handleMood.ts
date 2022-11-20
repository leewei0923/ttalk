import Storage from '@src/util/localStorage';
import { MOODDATAS } from './data';

const localStorage = new Storage();

interface setMoodType {
  account: string;
  type: string;
}

/**
 * 设置心情
 * @param props  acount, type
 */
export function SetMood(props: setMoodType): void {
  const { account, type } = props;
  const createTime = Date.now();
  const expireTime = Date.now() + 7200000;
  const moods = JSON.stringify({
    account,
    type,
    createTime,
    expireTime
  });

  localStorage.setStorage('moodOptions', moods);
}

export interface getMoodType extends setMoodType {
  createTime: string;
  expireTime: string;
  element: any;
}

/**
 * 获取当前心情
 * @returns
 */
export function GetMood(): getMoodType | '' {
  const moodOptionsString = localStorage.getStorage('moodOptions');
  const curTime = Date.now();

  if (moodOptionsString === '') {
    return '';
  }

  const moodOptions: getMoodType = JSON.parse(moodOptionsString);

  if (curTime > parseInt(moodOptions.expireTime)) {
    return '';
  } else {
    for (let i = 0; i < MOODDATAS.length; i++) {
      if (MOODDATAS[i].type === moodOptions.type) {
        moodOptions.element = MOODDATAS[i].element;
        break;
      }
    }
    return moodOptions;
  }
}
