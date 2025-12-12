# GitHub Pages缓存问题解决指南

## 问题描述
您修改了分数并成功上传到GitHub，但手机扫码后仍然显示旧的分数（53分）。这是由于GitHub Pages的缓存机制导致的。

## 缓存原因分析

1. **GitHub Pages CDN缓存**：GitHub Pages使用CDN（内容分发网络）来加速网站访问，CDN会缓存静态资源（如图片）以提高性能。这些缓存通常会保留一段时间（1-5分钟）。

2. **浏览器缓存**：您的手机浏览器可能已经缓存了之前的图片，导致即使GitHub上的图片已经更新，浏览器仍然显示缓存的旧图片。

3. **网络缓存**：您的网络服务提供商（ISP）也可能缓存了静态资源。

## 解决方案

### 方案1：等待缓存过期
GitHub Pages的CDN缓存通常会在1-5分钟后自动过期。您可以等待一段时间后再次扫描二维码。

### 方案2：刷新GitHub Pages缓存

1. 手动触发GitHub Pages重新构建：
   - 登录GitHub
   - 进入仓库页面
   - 点击"Settings"（设置）
   - 点击"Pages"
   - 在"Build and deployment"部分，点击"Actions"标签
   - 选择最新的构建任务
   - 点击"Re-run jobs"（重新运行作业）

2. 强制刷新浏览器缓存：
   - 在手机浏览器中打开GitHub Pages网址
   - 长按刷新按钮（或使用快捷键）
   - 选择"强制刷新"或"清除缓存并刷新"

### 方案3：修改图片URL

您可以修改App.tsx中的reportURL，添加一个版本参数来绕过缓存：

```typescript
// 原代码
const reportURL = "https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.png";

// 修改后
const reportURL = `https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.png?version=${Date.now()}`;
```

### 方案4：使用不同的图片名称

您可以修改upload-server.js，每次上传时使用不同的图片名称：

```javascript
// 原代码
const imagePath = path.join(__dirname, '报告图片', '认知评估报告.png');

// 修改后
const timestamp = new Date().getTime();
const imagePath = path.join(__dirname, '报告图片', `认知评估报告_${timestamp}.png`);
```

然后在App.tsx中也相应修改reportURL。

## 临时解决方案

如果您需要立即查看最新报告，可以：

1. 在手机浏览器中直接访问GitHub Pages上的图片URL：
   ```
   https://mamaqing.github.io/EWMCK/报告图片/认知评估报告.png
   ```

2. 长按刷新按钮，选择"强制刷新"或"清除缓存并刷新"

3. 然后再扫描二维码

## 最佳实践

1. **定期清理浏览器缓存**：定期在手机浏览器中清理缓存，避免旧内容影响新内容的查看。

2. **使用版本控制**：在URL中添加版本参数，确保每次修改都能立即生效。

3. **耐心等待**：了解GitHub Pages的缓存机制，上传后等待1-5分钟再查看最新内容。

4. **定期更新**：如果您需要频繁更新报告，可以考虑使用其他平台或服务，如Netlify、Vercel等，它们的缓存策略通常更灵活。

## 常见问题

**Q：为什么我在GitHub仓库中看到的图片已经更新，但扫码后还是旧的？**
A：这是因为GitHub仓库中的图片和GitHub Pages上的图片是分开的。GitHub Pages需要时间来构建和部署最新的内容。

**Q：我已经等待了很久，为什么还是看不到最新内容？**
A：您可以尝试清除浏览器缓存，或者使用不同的浏览器访问。

**Q：有没有办法避免缓存问题？**
A：您可以使用版本控制或修改图片名称的方式来绕过缓存。

**Q：我需要频繁更新报告，有没有更好的解决方案？**
A：如果您需要频繁更新报告，可以考虑使用其他平台或服务，如Netlify、Vercel等，它们的缓存策略通常更灵活。