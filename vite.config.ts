import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';

export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, '.', '');
    
    // 自定义插件：复制报告图片目录到输出目录
    const copyReportImagesPlugin = {
      name: 'copy-report-images',
      closeBundle() {
        if (command === 'build') {
          const srcDir = path.resolve(__dirname, '报告图片');
          const destDir = path.resolve(__dirname, 'docs/报告图片');
          
          // 创建目标目录
          if (!existsSync(destDir)) {
            mkdirSync(destDir, { recursive: true });
          }
          
          // 复制所有文件
          const files = readdirSync(srcDir);
          files.forEach(file => {
            const srcPath = path.join(srcDir, file);
            const destPath = path.join(destDir, file);
            copyFileSync(srcPath, destPath);
            console.log(`Copied ${file} to ${destDir}`);
          });
        }
      }
    };
    
    return {
      base: '/EWMCK/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), copyReportImagesPlugin],
      build: {
        outDir: 'docs',
        assetsDir: 'assets',
        rollupOptions: {
          output: {
            // 优化打包输出
            manualChunks: {
              vendor: ['react', 'react-dom'],
              charts: ['recharts'],
            },
          },
        },
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
