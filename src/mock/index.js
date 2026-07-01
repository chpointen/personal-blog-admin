const getCodeOfRandom = () => {
	// 所需随机抽取的样本数组
	const nums = new Array("q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
	// 初始化 拼接字符串
	let str = "";
	for (let i = 0; i < 4; i++) {
		// 每次生成一个0 - 61 之间的 number 作为随机获取验证码的下标
		const p = Math.floor(Math.random() * 1000) % 36;
		// 拼接验证码  随机抽取大小写字母和数字
		str += nums[p];
	}
	return str;
};

// ==================== 文章共享数据源（模块级变量，dev server 生命周期内持久） ====================
let nextArticleId = 13;
const articles = [
	{ id: 1, title: "Vue3 组合式 API 实战指南", content: "<h2>Vue3 组合式 API</h2><p>Vue3 的组合式 API 提供了一种更灵活的组织组件逻辑的方式。通过 setup 函数，我们可以将相关的逻辑组合在一起，而不是像选项式 API 那样分散在不同的选项中。</p><h3>ref 和 reactive</h3><p>ref 用于基本类型的响应式数据，reactive 用于对象类型的响应式数据。</p>", category_id: 1, category_name: "前端开发", tags: ["Vue3", "JavaScript"], status: 1, views: 1280, summary: "本文详细介绍了 Vue3 组合式 API 的核心概念和实战技巧", createTime: "2026-01-08 10:30:00", updateTime: "2026-01-12 14:22:00" },
	{ id: 2, title: "Vite 构建优化最佳实践", content: "<h2>Vite 构建优化</h2><p>Vite 作为新一代前端构建工具，以其极速的冷启动和热更新体验赢得了开发者的青睐。但在大型项目中，仍然需要关注构建优化。</p>", category_id: 2, category_name: "工具链", tags: ["Vite", "构建优化"], status: 1, views: 960, summary: "探索 Vite 构建优化的各种手段，提升项目构建效率", createTime: "2026-03-05 09:15:00", updateTime: "2026-03-10 11:00:00" },
	{ id: 3, title: "Pinia 状态管理入门教程", content: "<h2>Pinia 状态管理</h2><p>Pinia 是 Vue 的官方状态管理库，它提供了更简洁的 API 和更好的 TypeScript 支持。</p>", category_id: 1, category_name: "前端开发", tags: ["Pinia", "状态管理"], status: 1, views: 2340, summary: "从零开始学习 Pinia，掌握 Vue3 状态管理的最佳实践", createTime: "2026-02-15 08:00:00", updateTime: "2026-02-20 16:45:00" },
	{ id: 4, title: "Element Plus 表格组件深度解析", content: "<h2>Element Plus 表格</h2><p>Element Plus 的 Table 组件是企业级后台管理系统中最常用的组件之一。</p>", category_id: 3, category_name: "UI 框架", tags: ["Element Plus", "组件"], status: 1, views: 756, summary: "深入解析 Element Plus 表格组件的各种用法和最佳实践", createTime: "2026-05-08 14:20:00", updateTime: "2026-05-12 10:10:00" },
	{ id: 5, title: "Node.js 后端接口开发", content: "<h2>Node.js 后端开发</h2><p>使用 Express 框架快速搭建 RESTful API 服务。</p>", category_id: 4, category_name: "后端开发", tags: ["Node.js", "Express"], status: 0, views: 0, summary: "使用 Node.js + Express 构建 RESTful API", createTime: "2026-03-14 16:30:00", updateTime: "2026-03-18 09:00:00" },
	{ id: 6, title: "Git 工作流与团队协作", content: "<h2>Git 工作流</h2><p>规范的 Git 工作流是团队高效协作的基础。本文介绍 Git Flow、GitHub Flow 等主流工作流模型。</p>", category_id: 2, category_name: "工具链", tags: ["Git", "协作"], status: 0, views: 0, summary: "掌握 Git 工作流，提升团队协作效率", createTime: "2026-03-22 11:00:00", updateTime: "2026-03-26 17:30:00" },
	{ id: 7, title: "CSS Grid 布局完全指南", content: "<h2>CSS Grid 布局</h2><p>CSS Grid 是二维布局系统，能够同时处理行和列，是现代 Web 布局的利器。</p>", category_id: 1, category_name: "前端开发", tags: ["CSS", "布局"], status: 1, views: 1890, summary: "全面掌握 CSS Grid 布局的核心概念与实战技巧", createTime: "2026-01-18 07:30:00", updateTime: "2026-01-22 12:00:00" },
	{ id: 8, title: "JavaScript 异步编程详解", content: "<h2>JavaScript 异步编程</h2><p>从回调函数到 Promise，再到 async/await，JavaScript 异步编程模型不断演进。</p>", category_id: 1, category_name: "前端开发", tags: ["JavaScript", "异步"], status: 1, views: 3100, summary: "深入理解 JavaScript 异步编程的演进历程和最佳实践", createTime: "2026-05-03 10:00:00", updateTime: "2026-05-08 15:20:00" },
	{ id: 9, title: "Docker 容器化部署实战", content: "<h2>Docker 部署</h2><p>使用 Docker 将应用容器化，实现开发、测试、生产环境的一致性。</p>", category_id: 5, category_name: "运维部署", tags: ["Docker", "部署"], status: 0, views: 0, summary: "Docker 容器化部署从入门到实战", createTime: "2026-05-16 13:45:00", updateTime: "2026-05-20 08:30:00" },
	{ id: 10, title: "TypeScript 类型体操入门", content: "<h2>TypeScript 类型体操</h2><p>TypeScript 的类型系统非常强大，通过类型体操可以编写更安全的代码。</p>", category_id: 1, category_name: "前端开发", tags: ["TypeScript", "类型系统"], status: 1, views: 560, summary: "从入门到进阶，掌握 TypeScript 类型体操", createTime: "2026-05-24 09:00:00", updateTime: "2026-05-28 11:15:00" },
	{ id: 11, title: "Webpack 到 Vite 迁移指南", content: "<h2>Webpack → Vite</h2><p>从 Webpack 迁移到 Vite，享受更快的开发体验和更简洁的配置。</p>", category_id: 2, category_name: "工具链", tags: ["Webpack", "Vite"], status: 1, views: 1420, summary: "手把手教你从 Webpack 迁移到 Vite", createTime: "2026-06-05 08:30:00", updateTime: "2026-06-10 14:00:00" },
	{ id: 12, title: "前端性能优化全景图", content: "<h2>前端性能优化</h2><p>从网络请求到渲染管线，全方位梳理前端性能优化的关键手段。</p>", category_id: 1, category_name: "前端开发", tags: ["性能优化", "最佳实践"], status: 0, views: 0, summary: "前端性能优化的全景思维导图", createTime: "2026-06-15 10:00:00", updateTime: "2026-06-16 09:30:00" }
];

// ==================== 分类共享数据源 ====================
let nextCategoryId = 6;
const categories = [
	{ id: 1, name: "前端开发", slug: "frontend", description: "前端技术相关文章", article_count: 5, status: 1, sort_order: 1, create_time: "2025-01-01 00:00:00", update_time: "2025-01-01 00:00:00" },
	{ id: 2, name: "工具链", slug: "toolchain", description: "构建工具、开发效率相关", article_count: 3, status: 1, sort_order: 2, create_time: "2025-01-01 00:00:00", update_time: "2025-01-01 00:00:00" },
	{ id: 3, name: "UI 框架", slug: "ui-framework", description: "Element Plus 等 UI 框架相关", article_count: 1, status: 1, sort_order: 3, create_time: "2025-01-01 00:00:00", update_time: "2025-01-01 00:00:00" },
	{ id: 4, name: "后端开发", slug: "backend", description: "Node.js 等后端技术", article_count: 1, status: 1, sort_order: 4, create_time: "2025-01-01 00:00:00", update_time: "2025-01-01 00:00:00" },
	{ id: 5, name: "运维部署", slug: "devops", description: "Docker 部署与运维", article_count: 1, status: 1, sort_order: 5, create_time: "2025-01-01 00:00:00", update_time: "2025-01-01 00:00:00" }
];

// ==================== 标签共享数据源 ====================
let nextTagId = 6;
const tags = [
	{ id: 1, name: "Vue3", slug: "vue3", article_count: 2, status: 1, sort_order: 1, create_time: "2025-01-01 00:00:00", update_time: "2025-01-01 00:00:00" },
	{ id: 2, name: "JavaScript", slug: "javascript", article_count: 1, status: 1, sort_order: 2, create_time: "2025-01-01 00:00:00", update_time: "2025-01-01 00:00:00" },
	{ id: 3, name: "Vite", slug: "vite", article_count: 1, status: 1, sort_order: 3, create_time: "2025-01-01 00:00:00", update_time: "2025-01-01 00:00:00" },
	{ id: 4, name: "CSS", slug: "css", article_count: 1, status: 1, sort_order: 4, create_time: "2025-01-01 00:00:00", update_time: "2025-01-01 00:00:00" },
	{ id: 5, name: "TypeScript", slug: "typescript", article_count: 1, status: 1, sort_order: 5, create_time: "2025-01-01 00:00:00", update_time: "2025-01-01 00:00:00" }
];

// ==================== 用户信息共享数据源 ====================
const userInfo = {
	id: 1,
	username: "admin",
	nickname: "管理员",
	email: "admin@example.com",
	phone: "13800138000",
	avatar: "https://ts1.tc.mm.bing.net/th/id/OIP-C.e-CrkzvgfQXWs3YXrQD29QHaHa?w=193&h=194&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=1.7&rm=2",
	role: "主管",
	bio: "全栈开发工程师，热爱前端技术，专注于 Vue3 和 Node.js 开发。",
	createTime: "2025-01-01 00:00:00"
};

// 辅助：为列表接口生成 category 别名（兼容旧字段）
function toListItem(a) {
	return {
		id: a.id,
		title: a.title,
		category: a.category_name,
		tags: a.tags,
		status: a.status,
		views: a.views,
		createTime: a.createTime,
		updateTime: a.updateTime
	};
}

// 辅助：生成当前时间字符串
function now() {
	return new Date().toISOString().replace("T", " ").substring(0, 19);
}

export default [
	{
		url: "/api/Index/getCaptchaCode",
		method: "post",
		response: () => {
			return {
				status: {
					error_code: 0,
					error_msg: "success"
				},
				obj: {
					code_key: "6012e9ba65b442d2e5e7fec6e8eabcfd",
					// 4位随机验证码，实际项目中应该由后端生成并返回，前端只负责展示和传回后端验证
					code: getCodeOfRandom()
				}
			};
		}
	},
	{
		url: "/api/Index/login",
		method: "post",
		response: () => {
			return {
				status: {
					error_code: 0,
					error_msg: "success"
				},
				obj: {
					sys_token: "d33a7fdf547d2a086a96f4d38253cbc9",
					admin_nick_name: "admin网名",
					admin_id: "1",
					avatar: "https://ts1.tc.mm.bing.net/th/id/OIP-C.e-CrkzvgfQXWs3YXrQD29QHaHa?w=193&h=194&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
				}
			};
		}
	},
	{
		url: "/api/Index/getPermission",
		method: "post",
		response: () => {
			return {
				status: {
					error_code: 0,
					error_msg: "success"
				},
				obj: [
					{
						id: "1",
						name: "权限管理",  // 一级菜单
						parent_id: "0",
						type: "1", // 1: 一级菜单
						url: "/adminAuth/getRoleList",
						icon: "permission",
						children: [ // 二级菜单
							{
								id: "1-1",
								name: "角色列表",
								parent_id: "1",
								type: "2",
								url: "/adminAuth/getRoleList",
								icon: "permission",

								buttonList: [ // 按钮权限
									{
										id: "1-1-1",
										name: "查询",
										parent_id: "2",
										type: "3",
										url: "/adminAuth/getRoleList"
									},
									{
										id: "1-1-2",
										name: "配置权限",
										parent_id: "2",
										type: "3",
										url: "/adminAuth/setting"
									}
								]
							},
							{
								id: "1-2",
								name: "账号列表",
								parent_id: "1",
								icon: "permission",
								type: "2",
								url: "/api/adminAuth/adminList",
								buttonList: [
									{
										id: "1-2-1",
										name: "查询",
										parent_id: "1-2",
										type: "3",
										url: "/adminAuth/list"
									},
									{
										id: "1-2-2",
										name: "查看",
										parent_id: "1-2",
										type: "3",
										url: "/adminAuth/look"
									},
									{
										id: "1-2-3",
										name: "角色",
										parent_id: "1-2",
										type: "3",
										url: "/adminAuth/role"
									},
									{
										id: "1-2-4",
										name: "删除",
										parent_id: "1-2",
										type: "3",
										url: "/adminAuth/del"
									}
								]
							},
							{
								id: "1-3",
								name: "权限列表",
								icon: "permission",
								parent_id: "1",
								type: "2",
								url: "/adminAuth/permissionList"

							},
							{
								id: "1-4",
								name: "账号详情",
								icon: "permission",
								parent_id: "1",
								type: "2",
								url: "/account/detail",
								hidden: true

							}
						]
					},
					{
						id: "3",
						name: "文章管理",
						parent_id: "0",
						type: "1",
						url: "/article/index",
						icon: "article",
						children: [
							{
								id: "3-1",
								name: "文章列表",
								parent_id: "3",
								type: "2",
								url: "/article/index",
								icon: "article-ranking",
								buttonList: [
									{
										id: "3-1-1",
										name: "查询",
										parent_id: "3-1",
										type: "3",
										url: "/article/list"
									},
									{
										id: "3-1-2",
										name: "删除",
										parent_id: "3-1",
										type: "3",
										url: "/article/delete"
									},
									{
										id: "3-1-3",
										name: "批量删除",
										parent_id: "3-1",
										type: "3",
										url: "/article/batchDelete"
									}
								]
							}
						]
					},
					{
						id: "4",
						name: "分类管理",
						parent_id: "0",
						type: "1",
						url: "/category/index",
						icon: "category",
						children: [
							{
								id: "4-1",
								name: "分类列表",
								parent_id: "4",
								type: "2",
								url: "/category/index",
								icon: "category",
								buttonList: [
									{
										id: "4-1-1",
										name: "查询",
										parent_id: "4-1",
										type: "3",
										url: "/category/list"
									},
									{
										id: "4-1-2",
										name: "新增",
										parent_id: "4-1",
										type: "3",
										url: "/category/create"
									},
									{
										id: "4-1-3",
										name: "编辑",
										parent_id: "4-1",
										type: "3",
										url: "/category/update"
									},
									{
										id: "4-1-4",
										name: "删除",
										parent_id: "4-1",
										type: "3",
										url: "/category/delete"
									}
								]
							}
						]
					},
				{
					id: "5",
					name: "标签管理",
					parent_id: "0",
					type: "1",
					url: "/tag/index",
					icon: "tag",
					children: [
						{
							id: "5-1",
							name: "标签列表",
							parent_id: "5",
							type: "2",
							url: "/tag/index",
							icon: "tag",
							buttonList: [
								{
									id: "5-1-1",
									name: "查询",
									parent_id: "5-1",
									type: "3",
									url: "/tag/list"
								},
								{
									id: "5-1-2",
									name: "新增",
									parent_id: "5-1",
									type: "3",
									url: "/tag/create"
								},
								{
									id: "5-1-3",
									name: "编辑",
									parent_id: "5-1",
									type: "3",
									url: "/tag/update"
								},
								{
									id: "5-1-4",
									name: "删除",
									parent_id: "5-1",
									type: "3",
									url: "/tag/delete"
								}
							]
						}
					]
				},
			{
				id: "6",
				name: "个人设置",
				parent_id: "0",
				type: "1",
				url: "/profile/index",
				icon: "setting"
			}

				]
			};
		}
	},
	{
		url: "/api/article/list",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const page = parseInt(body.page) || 1;
			const pageSize = parseInt(body.pageSize) || 10;
			const title = (body.title || "").toLowerCase();
			const status = body.status !== undefined && body.status !== "" ? parseInt(body.status) : null;

			let filtered = articles;
			if (title) {
				filtered = filtered.filter(item => item.title.toLowerCase().includes(title));
			}
			if (status !== null) {
				filtered = filtered.filter(item => item.status === status);
			}

			const total = filtered.length;
			const start = (page - 1) * pageSize;
			const list = filtered.slice(start, start + pageSize).map(toListItem);

			return {
				status: { error_code: 0, error_msg: "success" },
				obj: { list, total },
				page_info: { cur_page: String(page), page_size: String(pageSize), total_items: String(total) }
			};
		}
	},
	{
		url: "/api/article/delete",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const id = parseInt(body.id);
			const idx = articles.findIndex(a => a.id === id);
			if (idx !== -1) {
				articles.splice(idx, 1);
				return { status: { error_code: 0, error_msg: "删除成功" } };
			}
			return { status: { error_code: 1, error_msg: "文章不存在" } };
		}
	},
	{
		url: "/api/article/batchDelete",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const ids = (body.ids || []).map(Number);
			let count = 0;
			for (let i = articles.length - 1; i >= 0; i--) {
				if (ids.includes(articles[i].id)) {
					articles.splice(i, 1);
					count++;
				}
			}
			return { status: { error_code: 0, error_msg: `成功删除 ${count} 篇文章` } };
		}
	},
	{
		url: "/api/article/detail",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const id = parseInt(body.id);
			const article = articles.find(a => a.id === id);
			if (article) {
				return { status: { error_code: 0, error_msg: "success" }, obj: { ...article } };
			}
			return { status: { error_code: 1, error_msg: "文章不存在" } };
		}
	},
	{
		url: "/api/article/create",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const article = {
				id: nextArticleId++,
				title: body.title || "",
				content: body.content || "",
				category_id: body.category_id || 1,
				category_name: body.category_name || "前端开发",
				tags: body.tags || [],
				status: body.status || 0,
				views: 0,
				summary: body.summary || "",
				createTime: now(),
				updateTime: now()
			};
			articles.push(article);
			return {
				status: { error_code: 0, error_msg: body.status === 1 ? "发布成功" : "草稿保存成功" },
				obj: { ...article }
			};
		}
	},
	{
		url: "/api/article/update",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const id = parseInt(body.id);
			const article = articles.find(a => a.id === id);
			if (!article) {
				return { status: { error_code: 1, error_msg: "文章不存在" } };
			}
			article.title = body.title || article.title;
			article.content = body.content || article.content;
			article.category_id = body.category_id || article.category_id;
			article.category_name = body.category_name || article.category_name;
			article.tags = body.tags || article.tags;
			article.status = body.status !== undefined ? body.status : article.status;
			article.summary = body.summary !== undefined ? body.summary : article.summary;
			article.updateTime = now();
			return {
				status: { error_code: 0, error_msg: body.status === 1 ? "发布成功" : "草稿保存成功" },
				obj: { ...article }
			};
		}
	},
	// ==================== 分类管理 ====================
	{
		url: "/api/category/list",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const page = parseInt(body.page) || 1;
			const pageSize = parseInt(body.pageSize) || 20;
			const name = (body.name || "").toLowerCase();

			let filtered = categories.map(c => ({
				...c,
				article_count: articles.filter(a => a.category_id === c.id).length
			}));
			if (name) {
				filtered = filtered.filter(c => c.name.toLowerCase().includes(name));
			}

			const total = filtered.length;
			const start = (page - 1) * pageSize;
			const list = filtered.slice(start, start + pageSize);

			return {
				status: { error_code: 0, error_msg: "success" },
				obj: { list, total },
				page_info: { cur_page: String(page), page_size: String(pageSize), total_items: String(total) }
			};
		}
	},
	{
		url: "/api/category/create",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const cat = {
				id: nextCategoryId++,
				name: body.name || "",
				slug: body.slug || "",
				description: body.description || "",
				article_count: 0,
				status: body.status !== undefined ? body.status : 1,
				sort_order: body.sort_order || 0,
				create_time: now(),
				update_time: now()
			};
			categories.push(cat);
			return { status: { error_code: 0, error_msg: "分类创建成功" }, obj: { ...cat } };
		}
	},
	{
		url: "/api/category/update",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const id = parseInt(body.id);
			const cat = categories.find(c => c.id === id);
			if (!cat) {
				return { status: { error_code: 1, error_msg: "分类不存在" } };
			}
			if (body.name !== undefined) cat.name = body.name;
			if (body.slug !== undefined) cat.slug = body.slug;
			if (body.description !== undefined) cat.description = body.description;
			if (body.sort_order !== undefined) cat.sort_order = body.sort_order;
			cat.update_time = now();
			return { status: { error_code: 0, error_msg: "分类更新成功" }, obj: { ...cat } };
		}
	},
	{
		url: "/api/category/delete",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const id = parseInt(body.id);
			const linked = articles.filter(a => a.category_id === id).length;
			if (linked > 0) {
				return { status: { error_code: 1, error_msg: `该分类下有 ${linked} 篇文章，无法删除` } };
			}
			const idx = categories.findIndex(c => c.id === id);
			if (idx !== -1) {
				categories.splice(idx, 1);
				return { status: { error_code: 0, error_msg: "删除成功" } };
			}
			return { status: { error_code: 1, error_msg: "分类不存在" } };
		}
	},
	{
		url: "/api/category/toggleStatus",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const id = parseInt(body.id);
			const status = body.status !== undefined ? parseInt(body.status) : undefined;
			const cat = categories.find(c => c.id === id);
			if (!cat) {
				return { status: { error_code: 1, error_msg: "分类不存在" } };
			}
			cat.status = status !== undefined ? status : (cat.status === 1 ? 0 : 1);
			cat.update_time = now();
			return { status: { error_code: 0, error_msg: "success" }, obj: { id: cat.id, status: cat.status } };
		}
	},
	// ==================== 标签管理 ====================
	{
		url: "/api/tag/list",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const page = parseInt(body.page) || 1;
			const pageSize = parseInt(body.pageSize) || 20;
			const name = (body.name || "").toLowerCase();

			let filtered = tags.map(t => ({
				...t,
				article_count: articles.filter(a => a.tags.includes(t.name)).length
			}));
			if (name) {
				filtered = filtered.filter(t => t.name.toLowerCase().includes(name));
			}

			const total = filtered.length;
			const start = (page - 1) * pageSize;
			const list = filtered.slice(start, start + pageSize);

			return {
				status: { error_code: 0, error_msg: "success" },
				obj: { list, total },
				page_info: { cur_page: String(page), page_size: String(pageSize), total_items: String(total) }
			};
		}
	},
	{
		url: "/api/tag/create",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const tag = {
				id: nextTagId++,
				name: body.name || "",
				slug: body.slug || "",
				article_count: 0,
				status: body.status !== undefined ? body.status : 1,
				sort_order: body.sort_order || 0,
				create_time: now(),
				update_time: now()
			};
			tags.push(tag);
			return { status: { error_code: 0, error_msg: "标签创建成功" }, obj: { ...tag } };
		}
	},
	{
		url: "/api/tag/update",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const id = parseInt(body.id);
			const tag = tags.find(t => t.id === id);
			if (!tag) {
				return { status: { error_code: 1, error_msg: "标签不存在" } };
			}
			if (body.name !== undefined) tag.name = body.name;
			if (body.slug !== undefined) tag.slug = body.slug;
			if (body.sort_order !== undefined) tag.sort_order = body.sort_order;
			tag.update_time = now();
			return { status: { error_code: 0, error_msg: "标签更新成功" }, obj: { ...tag } };
		}
	},
	{
		url: "/api/tag/delete",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const id = parseInt(body.id);
			const tagData = tags.find(t => t.id === id);
			const tagName = tagData ? tagData.name : "";
			const linked = articles.filter(a => a.tags.includes(tagName)).length;
			if (linked > 0) {
				return { status: { error_code: 1, error_msg: `该标签下有 ${linked} 篇文章使用，无法删除` } };
			}
			const idx = tags.findIndex(t => t.id === id);
			if (idx !== -1) {
				tags.splice(idx, 1);
				return { status: { error_code: 0, error_msg: "删除成功" } };
			}
			return { status: { error_code: 1, error_msg: "标签不存在" } };
		}
	},
	{
		url: "/api/tag/toggleStatus",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			const id = parseInt(body.id);
			const status = body.status !== undefined ? parseInt(body.status) : undefined;
			const tag = tags.find(t => t.id === id);
			if (!tag) {
				return { status: { error_code: 1, error_msg: "标签不存在" } };
			}
			tag.status = status !== undefined ? status : (tag.status === 1 ? 0 : 1);
			tag.update_time = now();
			return { status: { error_code: 0, error_msg: "success" }, obj: { id: tag.id, status: tag.status } };
		}
	},
	{
		url: "/api/adminAuth/adminList",
		method: "post",
		response: () => {
			return {
				status: {
					error_code: 0,
					error_msg: "success"
				},
				obj: [
					{
						id: "1",
						account: "admin",
						date: "2026-03-27 13:58:15",
						avatar: "https://ts1.tc.mm.bing.net/th/id/OIP-C.e-CrkzvgfQXWs3YXrQD29QHaHa?w=193&h=194&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
						role_name: "主管"
					},
					{
						id: "2",
						account: "彭于晏",
						date: "2026-01-27 13:58:15",
						avatar: "https://tse1-mm.cn.bing.net/th/id/OIP-C.TrFByNRNAkpMSe92uho9AwHaHa?w=198&h=198&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.3&pid=1.7&rm=3",
						role_name: "主管"
					},
					{
						id: "3",
						account: "张三",
						date: "2026-02-27 13:58:15",
						avatar: "https://tse3-mm.cn.bing.net/th/id/OIP-C.wqVMAyX_kkFSJkUrfUrx-AHaHE?w=182&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.3&pid=1.7&rm=3",
						role_name: "普通员工"
					},
					{
						id: "4",
						account: "李四",
						date: "2026-02-27 13:58:15",
						avatar: "https://tse3-mm.cn.bing.net/th/id/OIP-C.wqVMAyX_kkFSJkUrfUrx-AHaHE?w=182&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.3&pid=1.7&rm=3",
						role_name: "普通员工"
					},
					{
						id: "7",
						account: "王五",
						date: "2026-02-27 13:58:15",
						avatar: "https://tse3-mm.cn.bing.net/th/id/OIP-C.wqVMAyX_kkFSJkUrfUrx-AHaHE?w=182&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.3&pid=1.7&rm=3",
						role_name: "普通员工"
					},
					{
						id: "8",
						account: "老六",
						date: "2026-02-27 13:58:15",
						avatar: "https://tse3-mm.cn.bing.net/th/id/OIP-C.wqVMAyX_kkFSJkUrfUrx-AHaHE?w=182&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.3&pid=1.7&rm=3",
						role_name: "普通员工"
					},
					{
						id: "9",
						account: "蔡旭琨",
						date: "2026-02-27 13:58:15",
						avatar: "https://tse2-mm.cn.bing.net/th/id/OIP-C.xO7WIyYwiu7iQpxQtm7BEQAAAA?w=180&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.3&pid=1.7&rm=3",
						role_name: "普通员工"
					},
					{
						id: "10",
						account: "张飞",
						date: "2026-02-27 13:58:15",
						avatar: "https://tse3-mm.cn.bing.net/th/id/OIP-C.wqVMAyX_kkFSJkUrfUrx-AHaHE?w=182&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.3&pid=1.7&rm=3",
						role_name: "普通员工"
					}
				],
				page_info: {
					cur_page: "1",
					page_size: "10",
					total_items: "10"
				}
			};
		}
	},
	{
		url: "/api/adminAuth/getRoleList",
		method: "post",
		response: () => {
			return {
				status: {
					error_code: 0,
					error_msg: "success"
				},
				obj: [
					{
						id: "1",
						name: "主管",
						operator: "1686531954000"
					},
					{
						id: "2",
						name: "普通员工",
						operator: "1686532312000"
					},
					{
						id: "3",
						name: "销售",
						operator: "1686532312000"
					},
					{
						id: "4",
						name: "运营",
						operator: "1686532312000"
					},
					{
						id: "5",
						name: "产品经理",
						operator: "1686532312000"
					},
					{
						id: "6",
						name: "项目经理",
						operator: "1686532312000"
					}
				],
				page_info: {
					cur_page: "1",
					page_size: "10",
					total_items: "2"
				}
			};
		}
	},
	// ==================== 仪表盘 ====================
	{
		url: "/api/dashboard/stats",
		method: "post",
		response: () => {
			const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
			return {
				status: { error_code: 0, error_msg: "success" },
				obj: {
					articleCount: articles.length,
					categoryCount: categories.length,
					tagCount: tags.length,
					totalViews
				}
			};
		}
	},
	{
		url: "/api/dashboard/articleTrend",
		method: "post",
		response: () => {
			const months = [];
			const now = new Date();
			for (let i = 5; i >= 0; i--) {
				const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
				months.push(
					d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0")
				);
			}
			const counts = months.map(m => {
				return articles.filter(a => a.createTime.startsWith(m)).length;
			});
			return {
				status: { error_code: 0, error_msg: "success" },
				obj: { months, counts }
			};
		}
	},
	{
		url: "/api/dashboard/categoryDistribution",
		method: "post",
		response: () => {
			const distribution = categories.map(c => ({
				name: c.name,
				value: articles.filter(a => a.category_id === c.id).length
			}));
			return {
				status: { error_code: 0, error_msg: "success" },
				obj: distribution
			};
		}
	},
	{
		url: "/api/dashboard/topArticles",
		method: "post",
		response: () => {
			const top = [...articles]
				.filter(a => a.status === 1)
				.sort((a, b) => b.views - a.views)
				.slice(0, 10)
				.map(a => ({ title: a.title, views: a.views }));
			return {
				status: { error_code: 0, error_msg: "success" },
				obj: top
			};
		}
	},
	{
		url: "/api/dashboard/latestArticles",
		method: "post",
		response: () => {
			const latest = [...articles]
				.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
				.slice(0, 5)
				.map(a => ({
					id: a.id,
					title: a.title,
					category: a.category_name,
					tags: a.tags,
					views: a.views,
					status: a.status,
					createTime: a.createTime
				}));
			return {
				status: { error_code: 0, error_msg: "success" },
				obj: latest
			};
		}
	},
	// ==================== 个人设置 ====================
	{
		url: "/api/user/info",
		method: "post",
		response: () => {
			return { status: { error_code: 0, error_msg: "success" }, obj: { ...userInfo } };
		}
	},
	{
		url: "/api/user/update",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			if (body.nickname !== undefined) userInfo.nickname = body.nickname;
			if (body.email !== undefined) userInfo.email = body.email;
			if (body.phone !== undefined) userInfo.phone = body.phone;
			if (body.bio !== undefined) userInfo.bio = body.bio;
			return {
				status: { error_code: 0, error_msg: "更新成功" },
				obj: {
					nickname: userInfo.nickname,
					email: userInfo.email,
					phone: userInfo.phone,
					bio: userInfo.bio
				}
			};
		}
	},
	{
		url: "/api/user/avatar",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			if (body.avatar) userInfo.avatar = body.avatar;
			return { status: { error_code: 0, error_msg: "头像上传成功" } };
		}
	},
	{
		url: "/api/user/password",
		method: "post",
		response: (req) => {
			const body = req.body || {};
			if (body.oldPassword !== "123456") {
				return { status: { error_code: 1, error_msg: "旧密码错误" } };
			}
			if (!body.newPassword || body.newPassword.length < 6) {
				return { status: { error_code: 1, error_msg: "新密码至少6位" } };
			}
			return { status: { error_code: 0, error_msg: "密码修改成功" } };
		}
	}

];