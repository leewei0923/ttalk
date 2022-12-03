/**
 * 求出当前两个时间的差值
 */

// interface diffTimeType {
//   type: 'year' | 'month' | 'day';
//   date1: string | Date;
//   date2?: string | Date;
// }

export function getDiffTime(
  type: 'year' | 'month' | 'day',
  date1: string | Date,
  date2 = new Date()
): number {
  const newDate1 = new Date(date1).getTime();
  const newDate2 = new Date(date2).getTime();
  switch (type) {
    case 'year':
      return parseFloat(((newDate1 - newDate2) / 31536000000).toFixed(1));
    case 'month':
      return Math.floor((newDate1 - newDate2) / 2592000000);
    case 'day':
      return Math.floor((newDate1 - newDate2) / 86400000);
  }
}

/**
 * 时间显示当日显示具体时间,按照远近分为昨天，日期
 */

export function trimmedDate(target: string): string {
  const targetTime = new Date(target).getTime();
  const curTime = Date.now();
  const dateList = target.split(' ');

  if (curTime - targetTime < 86400000) {
    return `${dateList[1]}`;
  }

  if (targetTime - curTime > 86400000 && targetTime - curTime < 172800000) {
    return `昨天 ${dateList[1]}`;
  } else if (
    targetTime - curTime > 86400000 &&
    targetTime - curTime > 172800000
  ) {
    return `${dateList.join()}`;
  } else {
    return `${dateList[0]}`;
  }
}
