# Image Zoom - Obsidian 图片缩放与拖拽插件

一个轻量级的 Obsidian 图片查看插件，支持滚轮缩放和鼠标拖拽平移，替代年久失修的 Image Toolkit。

## ? 功能特性

- **点击放大**：在阅读模式和实时预览模式下点击图片即可全屏查看
- **滚轮缩放**：支持鼠标滚轮无级缩放，以鼠标指针位置为中心
- **拖拽平移**：放大后可按住鼠标左键拖拽移动图片
- **快速退出**：按 `Esc` 键或点击黑色背景即可关闭
- **轻量级**：纯原生实现，无第三方依赖，仅几百行代码
- **性能优化**：使用 `requestAnimationFrame` 节流，保证丝滑体验
- **样式隔离**：CSS 类名使用唯一前缀，不污染 Obsidian 原生样式

## ? 安装方法

### 方法一：手动安装（推荐）

1. **下载插件文件**

   将以下三个文件准备好：
   - `manifest.json`
   - `main.js`（需要编译生成）
   - `styles.css`

2. **找到 Obsidian 插件目录**

   - 打开 Obsidian 设置 → 第三方插件 → 安全模式（关闭）
   - 点击文件夹图标打开插件目录
   - 路径通常为：`<你的仓库>/.obsidian/plugins/`

3. **创建插件文件夹**

   在 plugins 目录下创建新文件夹：`image-zoom`

4. **复制文件**

   将 `manifest.json`、`main.js`、`styles.css` 三个文件复制到 `image-zoom` 文件夹中

5. **启用插件**

   - 重启 Obsidian
   - 进入设置 → 第三方插件
   - 找到 "Image Zoom & Pan" 并启用

### 方法二：开发模式安装

1. **克隆或下载本项目**

   ```bash
   git clone <repository-url>
   cd image-zoom-pan
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **编译插件**

   ```bash
   npm run build
   ```

4. **链接到 Obsidian**

   将编译后的文件复制到你的 Obsidian 仓库的插件目录：
   ```
   <你的仓库>/.obsidian/plugins/image-zoom-pan/
   ```

5. **启用插件**

   在 Obsidian 设置中启用插件

## ?? 开发指南

### 环境要求

- Node.js >= 16
- npm 或 yarn

### 开发步骤

```bash
# 安装依赖
npm install

# 开发模式（自动编译）
npm run dev

# 生产构建
npm run build
```

### 项目结构

```
image-zoom/
├── manifest.json    # 插件配置文件
├── main.ts          # 核心业务逻辑
├── styles.css       # 样式文件
├── package.json     # 项目依赖
├── tsconfig.json    # TypeScript 配置
├── esbuild.config.mjs  # 构建配置
└── README.md        # 说明文档
```

## ? 使用说明

1. 在阅读模式或实时预览模式下，**单击**任意图片
2. 图片将在黑色半透明背景上居中显示
3. **滚轮缩放**：滚动鼠标滚轮放大/缩小图片（以鼠标位置为中心）
4. **拖拽移动**：放大后，按住鼠标左键拖拽可移动图片
5. **退出查看**：
   - 按 `Esc` 键
   - 点击黑色背景空白区域

## ?? 技术实现

- **纯原生实现**：仅使用 TypeScript + DOM API，无第三方 UI 库
- **性能优化**：拖拽和缩放使用 `requestAnimationFrame` 节流
- **样式隔离**：所有 CSS 类名使用 `my-custom-zoom-` 前缀
- **兼容性**：支持 Obsidian v1.5+ 及以上版本

## ? 问题反馈

如果遇到问题，请检查：

1. Obsidian 版本是否 >= 1.5.0
2. 插件是否正确安装并启用
3. 是否在阅读模式或实时预览模式下操作

## ? 许可证

MIT License

## ? 致谢

灵感来源于 Image Toolkit 插件，本插件为其轻量级替代方案。
