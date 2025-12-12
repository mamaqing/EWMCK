# GitHub Pages 使用 docs 目录部署指南

## 已完成的操作

1. **修改了构建配置**：
   - 更新了 `vite.config.ts`，将构建输出目录从默认的 `dist` 改为 `docs`

2. **重新构建了项目**：
   - 执行了 `npm run build`，成功生成了 `docs` 目录及其内容

3. **确认了 .gitignore 配置**：
   - 检查了 `.gitignore` 文件，确认 `docs` 目录不被忽略，可以提交到 Git 仓库

4. **提交了更改**：
   - 将修改的 `vite.config.ts` 和新生成的 `docs` 目录提交到了本地 Git 仓库
   - 注意：由于网络问题，推送至 GitHub 仓库可能失败，请稍后手动尝试推送

## 手动完成 GitHub Pages 设置

请按照以下步骤在 GitHub 仓库设置中选择 `docs` 目录作为 GitHub Pages 的部署源：

### 步骤 1：访问 GitHub 仓库设置
1. 登录 GitHub 账户
2. 进入项目仓库：`https://github.com/mamaqing/EWMCK`
3. 点击顶部导航栏的 **Settings** 选项

### 步骤 2：配置 GitHub Pages
1. 在左侧菜单中，点击 **Pages** 选项
2. 在 **Build and deployment** 部分：
   - 确保 **Source** 选择为 **Deploy from a branch**
   - 在 **Branch** 下拉菜单中，选择 `master` 分支
   - 在 **Select folder** 下拉菜单中，选择 `/docs` 选项
   - 点击 **Save** 按钮保存设置

### 步骤 3：等待部署完成
- GitHub 将自动使用 `master` 分支的 `docs` 目录内容部署 GitHub Pages
- 部署完成后，您可以在 **GitHub Pages** 设置页面看到部署状态和访问链接

## 后续操作建议

1. **确保更改已推送到 GitHub**：
   ```bash
   git push origin master
   ```
   （如果之前的推送失败，请检查网络连接后重试）

2. **验证部署结果**：
   - 访问 GitHub Pages 链接：`https://mamaqing.github.io/EWMCK/`
   - 确认网站能够正常访问

3. **后续开发流程**：
   - 每次更新代码后，执行 `npm run build` 重新构建项目
   - 将更新的 `docs` 目录提交并推送到 GitHub 仓库
   - GitHub Pages 将自动重新部署

## 注意事项

- 如果在 GitHub Pages 设置中没有看到 `/docs` 选项，请确保：
  1. `docs` 目录已经存在于仓库的根目录
  2. 包含 `index.html` 文件（通常由构建命令自动生成）
  3. 已将 `docs` 目录提交并推送到 GitHub 仓库

- 如果部署后网站无法正常显示，请检查：
  1. `docs/index.html` 文件是否存在
  2. `vite.config.ts` 中的 `base` 配置是否正确设置为 `'/EWMCK/'`
  3. 浏览器控制台是否有错误信息