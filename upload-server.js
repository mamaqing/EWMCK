const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 3001;

// 允许跨域请求
app.use(cors());

// 解析JSON请求体
app.use(express.json({
  limit: '50mb' // 增加限制以支持大图片
}));

// 解析URL编码的请求体
app.use(express.urlencoded({ extended: true }));

// 上传图片的API端点
app.post('/upload-report', (req, res) => {
  try {
    // 获取图片数据
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ error: '缺少图片数据' });
    }
    
    // 确保报告图片目录存在
    const reportImageDir = './报告图片';
    if (!fs.existsSync(reportImageDir)) {
      fs.mkdirSync(reportImageDir, { recursive: true });
    }
    
    // 保存图片到本地，支持PNG和JPEG格式
    const imagePath = path.join(reportImageDir, '认知评估报告.png');
    fs.writeFileSync(imagePath, imageData.replace(/^data:image\/(png|jpeg);base64,/, ''), 'base64');
    
    // 确保docs/报告图片目录存在
    const docsImageDir = './docs/报告图片';
    if (!fs.existsSync(docsImageDir)) {
      fs.mkdirSync(docsImageDir, { recursive: true });
    }
    
    // 复制图片到docs目录
    const docsImagePath = path.join(docsImageDir, '认知评估报告.png');
    fs.copyFileSync(imagePath, docsImagePath);
    
    // 执行git命令上传到GitHub
    console.log('开始提交更改到GitHub...');
    
    // 添加文件
    execSync(`git add "${imagePath}" "${docsImagePath}"`, { stdio: 'inherit' });
    
    // 提交更改
    const commitMessage = '自动更新认知评估报告图片 - ' + new Date().toISOString();
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    // 推送更改
    execSync('git push origin master', { stdio: 'inherit' });
    
    console.log('✅ 图片已成功上传到GitHub！');
    
    // 返回成功响应
    res.json({ 
      success: true, 
      message: '图片已成功上传到GitHub',
      imageUrl: 'https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.png'
    });
  } catch (error) {
    console.error('❌ 上传失败:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 上传服务器已启动，监听端口 ${PORT}`);
  console.log(`📡 API地址: http://localhost:${PORT}/upload-report`);
});
