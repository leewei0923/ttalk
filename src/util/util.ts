/**
 * 先传入的最优先
 */

export function firstValidNumber<T extends string>(args: T[]): T | '' {
  let ans = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== undefined && args[i] !== null && args[i].length > 0) {
      ans = args[i];
      break;
    }
  }

  return ans === null ? '' : ans;
}

/**
 * 判断是否在可视区域内(相对于窗口)
 */
export function isInViewPort(element: Element): boolean {
  const viewWidth = window.innerWidth ?? document.documentElement.clientWidth;
  const viewHeight =
    window.innerHeight ?? document.documentElement.clientHeight;
  const { top, right, bottom, left } = element.getBoundingClientRect();

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
