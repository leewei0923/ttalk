

/**
 * 分组
 * @param list 原始列表
 * @param pageSize 每页的数量
 */
export function splitGroups<T>(list: T[], pageSize: number): T[][] {
  const groupsTem:T[][] = [];

  for (let i = 0; i < list.length; i += pageSize) {
    groupsTem.push(list.slice(i, i + pageSize));
  }

  return groupsTem;
}


