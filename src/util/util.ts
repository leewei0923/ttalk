/**
 * 先传入的最优先
 */

export function firstValidNumber<T>(args: T[]): T | '' {
  let ans = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== undefined && args[i] !== null) {
      ans = args[i];
      break;
    }
  }

  return ans === null ? '' : ans;
}
