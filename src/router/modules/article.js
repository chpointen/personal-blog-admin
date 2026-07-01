import Layout from "@/layout";

export default {
	path: "/article",
	component: Layout,
	redirect: "/article/index",
	alwaysShow: true,
	name: "article",
	meta: {
		title: "文章管理",
		icon: "article"
	},
	children: [
		{
			path: "/article/index",
			component: () => import("@/views/article/index.vue"),
			name: "articleIndex",
			meta: {
				title: "文章列表",
				icon: "article-ranking"
			}
		},
		{
			path: "/article/editor/:id?",
			component: () => import("@/views/article/editor.vue"),
			name: "articleEditor",
			hidden: true,
			meta: {
				title: "文章编辑",
				activeMenu: "/article/index"
			}
		}
	]
};
