const { execSync } = require('child_process');

console.log('测试Git推送功能...');

try {
  // 检查Git状态
  console.log('\n1. Git状态:');
  const status = execSync('git status', { encoding: 'utf8' });
  console.log(status);
  
  // 尝试Git推送
  console.log('\n2. 执行Git推送:');
  const pushResult = execSync('git push origin master', { encoding: 'utf8' });
  console.log(pushResult);
  
  console.log('\n✅ Git推送测试成功！GitHub连接正常。');
  
} catch (error) {
  console.error('\n❌ Git推送测试失败:', error.message);
}