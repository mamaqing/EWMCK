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
app.post('/upload-report', async (req, res) => {
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
    
    // 固定使用JPG格式
    const imageExtension = 'jpg';
    
    // 保存图片到本地
    const imagePath = path.join(reportImageDir, `认知评估报告.${imageExtension}`);
    fs.writeFileSync(imagePath, imageData.replace(/^data:image\/(png|jpeg);base64,/, ''), 'base64');
    
    // 确保docs/报告图片目录存在
    const docsImageDir = './docs/报告图片';
    if (!fs.existsSync(docsImageDir)) {
      fs.mkdirSync(docsImageDir, { recursive: true });
    }
    
    // 复制图片到docs目录
    const docsImagePath = path.join(docsImageDir, `认知评估报告.${imageExtension}`);
    fs.copyFileSync(imagePath, docsImagePath);
    
    // 执行git命令上传到GitHub
    console.log('开始提交更改到GitHub...');
    
    // 添加文件
    execSync(`git add "${imagePath}" "${docsImagePath}"`, { stdio: 'inherit' });
    
    // 提交更改
    const commitMessage = '自动更新认知评估报告图片 - ' + new Date().toISOString();
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    // 推送更改 - 添加重试机制
    let gitPushSuccess = false;
    let pushError = null;
    const maxRetries = 3;
    
    for (let i = 1; i <= maxRetries; i++) {
      try {
        console.log(`尝试第 ${i} 次推送...`);
        execSync('git push origin master', { stdio: 'inherit' });
        gitPushSuccess = true;
        break;
      } catch (error) {
        pushError = error;
        console.error(`⚠️ 第 ${i} 次推送失败:`, error.message);
        
        // 如果不是最后一次重试，等待一段时间后再试
        if (i < maxRetries) {
          console.log(`等待 ${i * 5} 秒后重试...`);
          // 等待一段时间
          const waitTime = i * 5 * 1000; // 每次重试等待时间递增
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }
    
    if (gitPushSuccess) {
      console.log('✅ 图片已成功上传到GitHub！');
      
      // 返回成功响应，使用正确的文件扩展名
      res.json({ 
        success: true, 
        message: '图片已成功上传到GitHub',
        imageUrl: `https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.${imageExtension}`
      });
    } else {
      console.error('⚠️ Git推送最终失败:', pushError.message);
      
      // 检查是否是网络连接问题
      if (pushError.message.includes('Could not connect to server') || pushError.message.includes('Failed to connect')) {
        console.error('⚠️ 可能是网络连接问题，请检查您的网络设置或代理配置');
        res.json({ 
          success: true, // 图片已保存到本地，只是未上传到GitHub
          message: '图片已成功保存到本地，但上传到GitHub失败（网络连接问题）。请检查网络设置后重试。',
          imageUrl: `https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.${imageExtension}`,
          localSaved: true,
          uploadFailed: true,
          errorType: 'network'
        });
      } else {
        // 其他Git错误
        res.json({ 
          success: true, // 图片已保存到本地，只是未上传到GitHub
          message: '图片已成功保存到本地，但上传到GitHub失败。请手动上传或检查Git配置。',
          imageUrl: `https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.${imageExtension}`,
          localSaved: true,
          uploadFailed: true,
          errorType: 'git'
        });
      }
    }
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
