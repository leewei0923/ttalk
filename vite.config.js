import { defineConfig } from 'vite';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react(), svgr()],
    server: {
      host: '0.0.0.0',
      proxy: {
        '/server': {
          target: 'http://localhost:3001', // 将请求代理到的目标服务器
          changeOrigin: true, // 更改请求头中的主机名和端口，用于跨域
        }
      }
    },
    resolve: {
      alias: [
        {
          find: '@src',
          replacement: resolve(__dirname, 'src')
        },
        {
          find: '@component',
          replacement: resolve(__dirname, './src/component')
        },
        {
          find: '@pic',
          replacement: resolve(__dirname, './src/images')
        }
      ]
    }
  };
});
