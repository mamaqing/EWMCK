#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 图片文件路径
const imagePath = './报告图片/认知评估报告.png';
const docsImagePath = './docs/报告图片/认知评估报告.png';

// 检查图片文件是否存在
if (!fs.existsSync(imagePath)) {
  console.error('错误：图片文件不存在于', imagePath);
  process.exit(1);
}

// 确保docs/报告图片目录存在
if (!fs.existsSync('./docs/报告图片')) {
  fs.mkdirSync('./docs/报告图片', { recursive: true });
}

// 复制图片到docs目录
fs.copyFileSync(imagePath, docsImagePath);
console.log('图片已复制到', docsImagePath);

// 执行git命令
const repoPath = __dirname;

console.log('开始提交更改...');

// 执行git操作
try {
  // 添加文件
  execSync(`git -C "${repoPath}" add "${imagePath}" "${docsImagePath}"`, { stdio: 'inherit' });
  
  // 提交更改
  const commitMessage = '自动更新认知评估报告图片 - ' + new Date().toISOString();
  execSync(`git -C "${repoPath}" commit -m "${commitMessage}"`, { stdio: 'inherit' });
  
  // 推送更改
  execSync(`git -C "${repoPath}" push origin master`, { stdio: 'inherit' });
  
  console.log('✅ 图片已成功上传到GitHub！');
  console.log('扫码查看最新报告：https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.png');
} catch (error) {
  console.error('❌ 提交失败:', error.message);
  process.exit(1);
}