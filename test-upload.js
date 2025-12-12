const fs = require('fs');
const path = require('path');
const { default: fetch } = require('node-fetch');

// 创建一个简单的测试图片（base64编码）
const testImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

async function testUpload() {
  try {
    console.log('开始测试上传功能...');
    
    // 发送上传请求
    const response = await fetch('http://localhost:3001/upload-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageData: testImageData
      })
    });
    
    const result = await response.json();
    console.log('上传响应:', result);
    
    if (result.success) {
      console.log('✅ 上传功能测试成功！');
      if (result.uploadFailed) {
        console.log('⚠️ 但Git推送失败，这可能是网络问题或Git配置问题');
      } else {
        console.log('✅ Git推送也成功了！');
      }
    } else {
      console.log('❌ 上传功能测试失败:', result.error);
    }
    
  } catch (error) {
    console.error('❌ 测试上传功能时发生错误:', error);
  }
}

testUpload();