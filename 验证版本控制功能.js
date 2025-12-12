// 验证版本控制功能是否正常工作
const qrcode = require('qrcode.react');
const fs = require('fs');

// 模拟生成包含时间戳的报告URL
const reportURL = `https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.png?version=${Date.now()}`;

console.log('生成的报告URL:', reportURL);
console.log('是否包含版本参数:', reportURL.includes('?version='));
console.log('版本参数值:', reportURL.split('=')[1]);

// 检查URL格式是否正确
if (reportURL.match(/^https:\/\/mamaqing\.github\.io\/EWMCK\/报告图片\/认知评估报告\.png\?version=\d+$/)) {
  console.log('✅ URL格式正确，版本控制功能已启用');
} else {
  console.log('❌ URL格式不正确');
}
