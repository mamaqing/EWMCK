# GitHub Pages 设置指南

## 1. 在GitHub上设置GitHub Pages

1. 登录您的GitHub账户，进入仓库 `mamaqing/EWMCK`
2. 点击顶部的 `Settings` 选项卡
3. 在左侧菜单中找到并点击 `Pages`
4. 在 `Build and deployment` 部分：
   - **Source**: 选择 `Deploy from a branch`
   - **Branch**: 选择 `master` 分支（不是main分支，因为项目实际使用master分支）
   - **Directory**: 选择 `/(root)` 目录（不要选择docs，因为项目中没有docs目录）
   - 点击 `Save` 按钮
5. 等待几分钟，GitHub Pages将自动构建并部署您的网站

## 2. 上传报告图片

1. 准备您的报告图片文件（建议使用PNG或JPG格式）
2. 将图片文件复制到项目的 `报告图片` 文件夹中
3. 提交并推送这些图片到GitHub仓库：
   ```bash
   git add 报告图片/
   git commit -m "Add report images"
   git push origin master
   ```

## 3. 修改二维码URL

当您完成GitHub Pages设置并上传图片后，需要修改 `App.tsx` 中的 `reportURL` 常量：

```typescript
// 示例：如果您的图片文件名为 "认知评估报告.png"
const reportURL = "https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.png";
```

## 4. 测试二维码

1. 重新构建并部署项目
2. 生成二维码并使用手机扫描
3. 确认可以正常访问报告图片

## 注意事项

- URL路径区分大小写，请确保文件名和路径与实际一致
- GitHub Pages可能需要几分钟时间来更新内容
- 如果您的仓库是私有的，GitHub Pages将无法公开访问
- 建议使用简洁的英文文件名，避免使用特殊字符