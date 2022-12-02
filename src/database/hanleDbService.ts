import { InsertCollectType } from '@src/api/collect';
import { collect_data_entry, db } from '@src/database/db';
import dayjs from 'dayjs';

export class HandleCollectDB {
  async load(account: string, type?: string): Promise<collect_data_entry[]> {
    let dataRes: collect_data_entry[];

    if (type === undefined || type === 'allCollect') {
      dataRes = await db.collectData
        .where({
          account
        })
        .toArray();
    } else {
      dataRes = await db.collectData
        .where({
          account,
          type
        })
        .toArray();
    }

    return dataRes;
  }

  insert(data: InsertCollectType): void {
    const { collect_id, account, content, origin, type } = data;
    const curDate = dayjs().format('YYYY-MM-DD HH:mm');

    db.collectData
      .add({
        account,
        content,
        origin,
        collect_id,
        type,
        create_time: curDate,
        update_time: curDate
      })
      .catch((err) => console.log('插入collect出错', err));
  }

  update(
    collect_id: string,
    content: string,
    collects: collect_data_entry[]
  ): collect_data_entry[] {
    const curDate = dayjs().format('YYYY-MM-DD HH:mm');

    for (let i = 0; i < collects.length; i++) {
      if (collects[i].collect_id === collect_id) {
        collects[i].content = content;
        collects[i].update_time = curDate;
        break;
      }
    }
    db.collectData
      .where('collect_id')
      .equals(collect_id)
      .modify({
        content,
        update_time: curDate
      })
      .catch((err) => console.log('更新collect出错', err));

    return collects;
  }

  delete(
    collect_id: string,
    collects: collect_data_entry[]
  ): collect_data_entry[] {
    for (let i = 0; i < collects.length; i++) {
      if (collects[i].collect_id === collect_id) {
        collects.splice(i, 1);
        break;
      }
    }
    db.collectData
      .where({
        collect_id
      })
      .delete()
      .catch((err) => console.log('更新collect出错', err));

    return collects;
  }
}
