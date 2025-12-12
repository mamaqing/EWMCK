const fs = require('fs');
const path = require('path');
const http = require('http');

// 读取一个示例PNG图片
const testImagePath = './报告图片/认知评估报告.png';

if (!fs.existsSync(testImagePath)) {
  console.error('❌ 测试图片不存在，请先生成报告图片');
  process.exit(1);
}

console.log('测试上传功能...');

// 读取图片并转换为base64
const imageData = fs.readFileSync(testImagePath);
const base64Image = imageData.toString('base64');
const imageDataURL = `data:image/png;base64,${base64Image}`;

// 准备请求数据
const postData = JSON.stringify({
  imageData: imageDataURL
});

// 配置HTTP请求
const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/upload-report',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

// 发送请求
const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  
  res.on('data', (chunk) => {
    console.log(`响应体: ${chunk}`);
  });
  
  res.on('end', () => {
    console.log('\n✅ 上传请求已完成');
  });
});

req.on('error', (e) => {
  console.error(`❌ 请求错误: ${e.message}`);
});

// 写入请求数据
req.write(postData);
req.end();