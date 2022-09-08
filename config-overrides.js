const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
/* 路径别名配置 */
module.exports = override(
  addWebpackAlias({
    '@src': resolve('src'),
    '@component': resolve('./src/component'),
    '@pic': resolve('./src/images')
  })
);
