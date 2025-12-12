# GitHub推送失败故障排除指南

## 问题描述
自动上传图片时显示错误：`Command failed: git push origin master`

## 错误原因分析

### 1. 网络环境问题
- 检查结果：网络连接正常（可以ping通github.com）
- 问题所在：可能是网络限制、防火墙或代理设置导致Git推送请求被重置
- 解决方案：
  - 检查是否使用了公司/学校网络的防火墙
  - 尝试更换网络环境（如手机热点）
  - 检查代理服务器设置

### 2. Git配置问题
- 检查结果：Git远程仓库配置正确
- 可能原因：凭证管理器问题或访问权限失效
- 解决方案：
  ```bash
  # 清除现有凭证
  git config --global --unset credential.helper
  # 重置凭证管理器
  git config --global credential.helper wincred
  ```

### 3. GitHub服务器问题
- 可能原因：GitHub服务器临时维护或网络波动
- 解决方案：
  - 稍后重试（建议等待5-10分钟）
  - 访问GitHub状态页面检查服务状态

## 替代解决方案

### 方案一：手动上传图片
1. 自动上传失败后，图片已自动保存到本地：`报告图片/认知评估报告.png`
2. 手动将此图片上传到GitHub Pages：
   - 访问：https://github.com/mamaqing/EWMCK
   - 进入 `docs/报告图片` 目录
   - 点击"Add file" -> "Upload files"
   - 选择本地图片上传
   - 填写提交信息并确认

### 方案二：使用GitHub Desktop
1. 下载并安装GitHub Desktop：https://desktop.github.com/
2. 克隆仓库：`https://github.com/mamaqing/EWMCK.git`
3. 将本地图片复制到 `docs/报告图片` 目录
4. 在GitHub Desktop中点击"Commit to master"
5. 点击"Push origin"

### 方案三：使用其他Git客户端
- TortoiseGit：https://tortoisegit.org/
- SourceTree：https://www.sourcetreeapp.com/

## 功能说明

### 即使上传失败，您仍然可以：
- ✅ 查看生成的报告图片
- ✅ 保存图片到本地
- ✅ 使用生成的二维码（二维码已含版本控制参数）
- ✅ 手动上传图片后，二维码仍然有效

### 自动上传的替代工作流程：
1. 修改分数
2. 点击"生成二维码"按钮
3. 保存图片到本地（自动完成）
4. 手动上传图片到GitHub
5. 手机扫码查看最新报告

## 技术支持
如果问题持续存在：
- 检查网络环境是否允许Git协议（端口9418）
- 尝试使用SSH协议替代HTTPS：`git@github.com:mamaqing/EWMCK.git`
- 联系网络管理员检查防火墙设置
