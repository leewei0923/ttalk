/**
 *
 * @param target
 * @returns
 */
function pmtArr(target: string): number[] {
  const pmtArr = [];
  const targetArr = target.split('');
  for (let i = 0; i < target.length; i++) {
    // 获取模式串不同长度下的部分匹配值
    const pmt = targetArr;
    let count = 0;
    for (let k = 0; k < i; k++) {
      const header = pmt.slice(0, k + 1);

      const footer = pmt.slice(i - k, i + 1);

      if (header.join('') === footer.join('')) {
        const num = header.length;
        if (num > count) count = num;
      }
    }
    pmtArr.push(i + 1 - count);
  }
  return pmtArr;
}

interface conpareType {
  start: number;
  end: number;
}

/**
 * 字符串比较
 * @param str
 * @param target
 * @returns
 */

export function compareString(str: string, target: string): conpareType | -1 {
  let isMatch = [];
  const callerKmp = [];
  const pmt = pmtArr(target);

  for (let i = 0; i < str.length; i++) {
    let tempIndex = 0;
    for (let j = 0; j < target.length; j++) {
      if (i + target.length <= str.length) {
        if (target.charAt(j) === str.charAt(i + j)) {
          isMatch.push(target.charAt(j));
        } else {
          if (j === 0) break;
          // 第一个不匹配直接跳到下一个
          const skip = pmt[j - 1];
          tempIndex = i + skip - 1;
          break;
        }
      }
    }
    const data = {
      index: i,
      matchArr: isMatch
    };
    callerKmp.push(data);
    if (tempIndex !== 0) i = tempIndex;
    if (isMatch.length === target.length) {
      return {
        start: i,
        end: i + target.length - 1
      };
    }
    isMatch = [];
  }

  return -1;
}
