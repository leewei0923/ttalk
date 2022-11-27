import { GetTtakLoginUser } from '@src/common/personInfo';
import { db } from '@src/database/db';

// 公共区域

const userInfo = GetTtakLoginUser();

export interface userListTyep {
  sign: string;
  children: userListChildrenType[];
}

interface userListChildrenType {
  name: string;
  account: string;
  avatar_url: any;
  status: 'online' | 'offline';
}

// 拿到所有的好友

export const friendsRes = async (): Promise<string[]> => {
  if (userInfo === '') return [];

  const res = await db.friends
    .where({
      user_account: userInfo[0].account
    })
    .toArray()
    .catch((err) => {
      console.log('所有好友在线状态获取失效', err);
    });

  const waitCheckOnline = [];

  if (!Array.isArray(res)) return [];

  for (let i = 0; i < res.length; i++) {
    waitCheckOnline.push(res[i].friend_account);
  }

  return waitCheckOnline;
};

//

export const genUserList = (getList: (list: userListTyep[]) => void): void => {
  if (userInfo === '') return;
  const map = new Map<string, userListChildrenType[]>();
  db.friends
    .where({
      user_account: userInfo[0].account
    })
    .toArray()
    .then((res1) => {
      for (let i = 0; i < res1.length; i++) {
        if (res1[i].friend_flag && !res1[i].blacklist) {
          db.userInfoData
            .where({
              account: res1[i].friend_account
            })
            .toArray()
            .then((res2) => {
              const { account, nickname, avatar } = res2[0];
              const firstWord = account.charAt(0);

              if (map.has(firstWord)) {
                map.get(firstWord);
                const temList = map.get(firstWord);
                temList?.push({
                  name: nickname,
                  avatar_url: avatar,
                  account,
                  status: 'offline'
                });

                map.set(firstWord, temList ?? []);
              } else {
                map.set(firstWord, [
                  {
                    name: nickname,
                    avatar_url: avatar,
                    account,
                    status: 'offline'
                  }
                ]);
              }

              const newObj: userListTyep[] = [];
              map.forEach((v, k) => {
                newObj.push({
                  sign: k,
                  children: v
                });
              });
              if (typeof getList === 'function') {
                getList(newObj);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export function mergeList(
  userList: userListTyep[],
  onlineList: Array<{ account: string; status: 'online' | 'offline' }>
): userListTyep[] {
  if (!Array.isArray(onlineList)) return userList;

  const newUserList = JSON.parse(JSON.stringify(userList));

  for (const x of onlineList) {
    const firstWord = x.account.charAt(0);

    if (x.status === 'online') {
      for (let i = 0; i < newUserList.length; ++i) {
        if (newUserList[i].sign === firstWord) {
          for (let j = 0; j < newUserList[i].children.length; ++j) {
            if (newUserList[i].children[j].account === x.account) {
              newUserList[i].children[j].status = 'online';
              break;
            }
          }
          break;
        }
      }
    }
  }

  return newUserList;
}
