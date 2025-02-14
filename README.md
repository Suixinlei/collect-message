# 信息收集转发服务 - Cloudflare 部署版

## 项目简介

本服务是一个部署在 Cloudflare Workers 上的信息收集和 API 转发解决方案，专为国内机器访问海外数据需求设计，提供稳定可靠的数据中转服务。

## 主要功能

- 📩 信息收集表单处理
- 🔄 API 请求代理转发
- 🌐 国内网络环境适配
- 🔒 基于 Cloudflare 的安全防护
- 📊 基础数据管理功能

## 技术栈

- **前端框架**: React + Vite
- **样式方案**: Ant Design 组件库
- **构建工具**: Wrangler + TypeScript
- **部署平台**: Cloudflare Workers
- **辅助工具**: Axios 网络请求库

## 快速部署

### 前置要求

- Cloudflare 账号
- Node.js 20.x+
- Wrangler CLI 已安装 (`npm install -g wrangler`)

### 部署步骤

```bash
# 1. 安装依赖
npm install

# 2. 构建项目
npm run build

# 3. 登录 Cloudflare
wrangler login

# 4. 部署到 Cloudflare
npm run deploy

# 5. 绑定自定义域名 (可选)
wrangler pages project deploy-zone
```

## 项目结构

```plaintext
├── dist/                 # 构建输出目录
├── src/                  # 源代码
│   ├── pages/            # 页面组件
│   ├── main.tsx          # 应用入口
│   └── App.tsx           # 根组件
├── wrangler.toml         # Cloudflare 配置
└── package.json          # 依赖管理
```

## 环境变量配置

在 `wrangler.toml` 中添加：

```toml
[vars]
API_ENDPOINT = "your_backend_api"
AUTH_KEY = "your_secret_key"
```

## 开发指南

```bash
# 本地开发模式
npm run worker:dev

# 生产预览
npm run preview

# 代码规范检查
npm run lint
```

## 常见问题

### Q1: 如何处理跨域问题？

在 `wrangler.toml` 中添加 CORS 配置：

```toml
[headers]
"Access-Control-Allow-Origin" = "*"
```

### Q2: 部署失败怎么办？

1. 检查 `wrangler login` 状态
2. 确认 compatibility_date 配置
3. 查看构建日志 `npm run build -- --debug`

### Q3: 数据存储在哪里？

- 临时数据：使用 Cloudflare Workers KV
- 持久化数据：建议对接自有数据库

### Q4: 如何绑定自定义域名？

1. 在 Cloudflare DNS 添加 CNAME 记录
2. 执行 `wrangler pages domain add <YOUR_DOMAIN>`
