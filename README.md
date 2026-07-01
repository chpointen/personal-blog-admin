# 个人博客管理系统

一个基于 Vue 3 和 Vite 构建的个人博客后台管理系统，用于集中管理博客文章、分类、标签、账号权限及个人资料。

项目目前内置 Mock 数据，无需启动后端服务即可进行本地开发和功能体验。

## 功能模块

- 数据看板：展示文章、分类、标签和访问量统计
- 文章管理：文章查询、新增、编辑、发布、删除及批量删除
- 分类管理：分类新增、编辑、状态切换和删除
- 标签管理：标签新增、编辑、状态切换和删除
- 权限管理：角色、账号、菜单及按钮权限管理
- 个人设置：维护头像和个人资料、修改密码
- 系统功能：动态路由、权限校验、标签页导航、面包屑、全屏和主题设置

## 技术栈

- Vue 3
- Vite 4
- Vue Router 4
- Pinia
- Element Plus
- Axios
- ECharts
- WangEditor
- Sass
- Mock.js / vite-plugin-mock

## 环境要求

建议使用：

- Node.js 18 或更高版本
- npm 9 或更高版本

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发环境

```bash
npm run dev
```

启动后访问：

```text
http://localhost:9999
```

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 本地预览生产版本

```bash
npm run preview
```

## 本地登录

开发环境使用本地 Mock 接口：

- 用户名：可填写任意非空用户名
- 密码：填写任意不少于 6 位的密码
- 验证码：填写页面当前显示的 4 位验证码

Mock 数据仅在当前开发服务运行期间保留，重新启动服务后会恢复为初始数据。

## 项目结构

```text
.
├─ public/                 # 公共静态资源
├─ src/
│  ├─ api/                 # 接口定义
│  ├─ assets/              # 图片、音频等资源
│  ├─ components/          # 通用组件
│  ├─ constant/            # 全局常量
│  ├─ directives/          # 自定义指令
│  ├─ filters/             # 全局过滤方法
│  ├─ icons/               # SVG 图标
│  ├─ layout/              # 后台整体布局
│  ├─ mock/                # 本地 Mock 接口与数据
│  ├─ plugins/             # Vite 与组件库插件
│  ├─ router/              # 路由及业务路由模块
│  ├─ stores/              # Pinia 状态管理
│  ├─ styles/              # 全局样式
│  ├─ utils/               # 通用工具
│  ├─ views/               # 页面
│  ├─ App.vue              # 根组件
│  ├─ main.js              # 应用入口
│  └─ permission.js        # 路由权限控制
├─ index.html
├─ package.json
└─ vite.config.js
```

## 接入真实后端

接口请求统一封装在 `src/utils/axios.js`，接口模块位于 `src/api`。

接入真实后端时，需要：

1. 在 `vite.config.js` 中关闭本地 Mock。
2. 在 `src/constant/index.js` 中配置对应环境的接口地址。
3. 根据后端响应结构调整登录、权限及业务接口的数据处理逻辑。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run commit` | 使用 Commitizen 创建规范提交 |

