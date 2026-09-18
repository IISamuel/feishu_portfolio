# 个人作品集网站（飞书 AI 应用）

一个纯静态的个人项目集网站，用于展示飞书生态的 AI 应用项目。内容完全由 Markdown 文件驱动，无需数据库和后端。

## 快速开始

```bash
npm install        # 第一次运行需要
npm run dev        # 本地开发，默认 http://localhost:5173
npm run build      # 构建产物到 dist/
npm run preview    # 本地预览构建产物
```

> 需要 Node.js 18 或更高版本。

## ★ 如何自定义内容（你只需要动这两个地方）

### 1. 修改个人文案 —— `src/content/site.config.ts`

姓名、职位、首屏简介、邮箱、GitHub、飞书主页、简历链接……全部在这个文件里，每个字段都有中文注释。留空字符串的链接会自动隐藏对应按钮。

### 2. 添加 / 修改项目 —— `src/content/projects/`

**每个项目一个文件夹**，文件夹里放一个 `index.md`：

```
src/content/projects/
├── 01-feishu-qa-bot/
│   └── index.md          ← 项目正文 + 元数据
├── 02-feishu-doc-assistant/
│   └── index.md
└── 03-feishu-schedule-bot/
    └── index.md
```

`index.md` 顶部的 frontmatter（`---` 包裹的部分）是可配置字段：

```markdown
---
title: 飞书智能问答助手   # 项目名（必填）
slug: feishu-qa-bot      # URL 路径标识，如 /project/feishu-qa-bot（必填，全局唯一）
date: 2026-08            # 展示日期，格式随意，用于排序
tags: [飞书机器人, RAG]  # 标签
cover: /assets/projects/01-feishu-qa-bot/cover.png   # 封面图（可留空）
demo: https://...        # 在线体验链接（可留空，自动出现"在线体验"按钮）
github: https://...      # 源码链接（可留空）
highlight: true          # 置顶精选（可留空）
order: 10                # 排序权重，越大越靠前（可留空）
---
```

`---` 之后就是项目详情正文，支持完整的 Markdown：标题、**加粗**、表格、代码块、引用、图片等。可以直接复制 `01-feishu-qa-bot/index.md` 作为模板。

**排序规则**：`highlight: true` 的排最前，其次按 `order` 从大到小，再按 `date` 从新到旧。

### 3. 项目图片

图片放在 `public/assets/projects/<项目文件夹名>/` 下，Markdown 和 frontmatter 里用 `/assets/projects/<项目文件夹名>/xxx.png` 这样的绝对路径引用。构建后这些文件会原样拷贝到网站根目录。

- 封面图建议 16:9（如 800×450），PNG / JPG / SVG 均可
- 正文里插入截图：`![说明文字](/assets/projects/01-feishu-qa-bot/screenshot.png)`

### 4. 删除示例项目

直接删掉 `src/content/projects/` 下对应的文件夹即可，网站会自动更新。

## 部署上线

### 方式一：Vercel（推荐，免费）

1. 在 GitHub 上新建一个仓库，把本项目代码 push 上去
2. 打开 [vercel.com](https://vercel.com)，用 GitHub 账号登录
3. 「Add New Project」→ 导入该仓库 → 直接点 Deploy（Vite 项目零配置识别）
4. 几分钟后得到一个 `https://你的项目名.vercel.app` 公网地址，每次 push 代码自动重新部署

### 方式二：Netlify

类似：GitHub 授权 → Import 仓库 → 构建命令 `npm run build`，输出目录 `dist`。

### 方式三：自建云服务器（Nginx）

网站是纯静态产物，任何能托管文件的服务器都能跑：

```bash
npm run build      # 生成 dist/
# 把 dist/ 目录上传到服务器，如 /var/www/portfolio
```

Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/portfolio;
    index index.html;

    # SPA 路由回退（必须，否则刷新详情页会 404）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location /assets/ {
        expires 30d;
    }
}
```

记得再配 HTTPS（可用免费的 Let's Encrypt / certbot）。

## 技术栈

Vite + React + TypeScript · react-router-dom · react-markdown（GFM）· framer-motion · 纯手写 CSS（无 UI 组件库）

## 常见问题

- **改内容后页面没变化？** 开发服务器（`npm run dev`）开着时会自动热更新；如果线上没变，确认已经 push 到 GitHub（Vercel 会自动重新部署）。
- **想改配色 / 字体？** 全部颜色、圆角、阴影都在 `src/index.css` 顶部的 `:root` 变量里。
- **详情页刷新 404？** 本地 `npm run preview` 和 Vercel 都已配好回退；自建服务器请检查 Nginx 的 `try_files` 配置。
