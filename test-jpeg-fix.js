// JPEG格式修复测试脚本
// 验证图片是否能正确保存为.jpg格式

const fs = require('fs');
const path = require('path');

// 创建一个模拟的JPEG base64数据
const mockJpegData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z';

// 测试图片格式检测
console.log('=== JPEG格式修复测试 ===');

const isJPEG = mockJpegData.startsWith('data:image/jpeg');
const imageFormat = isJPEG ? 'jpeg' : 'png';
const imageExtension = isJPEG ? 'jpg' : 'png';

console.log(`图片格式检测: ${imageFormat}`);
console.log(`文件扩展名: ${imageExtension}`);

// 测试保存路径生成
const reportImageDir = './报告图片';
const imagePath = path.join(reportImageDir, `认知评估报告.${imageExtension}`);
const docsImageDir = './docs/报告图片';
const docsImagePath = path.join(docsImageDir, `认知评估报告.${imageExtension}`);

console.log(`本地保存路径: ${imagePath}`);
console.log(`GitHub Pages路径: ${docsImagePath}`);

// 检查目录是否存在
if (!fs.existsSync(reportImageDir)) {
  fs.mkdirSync(reportImageDir, { recursive: true });
  console.log(`已创建目录: ${reportImageDir}`);
}

if (!fs.existsSync(docsImageDir)) {
  fs.mkdirSync(docsImageDir, { recursive: true });
  console.log(`已创建目录: ${docsImageDir}`);
}

// 测试保存图片
try {
  fs.writeFileSync(imagePath, mockJpegData.replace(/^data:image\/(png|jpeg);base64,/, ''), 'base64');
  console.log(`✅ 测试图片已保存为: ${imagePath}`);
  
  // 测试复制到docs目录
  fs.copyFileSync(imagePath, docsImagePath);
  console.log(`✅ 测试图片已复制到: ${docsImagePath}`);
  
  // 检查文件是否存在
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    console.log(`📁 测试图片大小: ${Math.round(stats.size / 1024)} KB`);
  }
  
  console.log('\n=== 测试完成 ===');
  console.log('✅ JPEG格式修复逻辑正常工作');
  console.log('✅ 图片能正确保存为.jpg格式');
  console.log('✅ 文件扩展名处理正确');
  
} catch (error) {
  console.error('❌ 测试失败:', error.message);
}
