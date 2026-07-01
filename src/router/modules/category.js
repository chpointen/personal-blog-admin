import Layout from "@/layout";

export default {
	path: "/category",
	component: Layout,
	redirect: "/category/index",
	alwaysShow: true,
	name: "category",
	meta: {
		title: "分类管理",
		icon: "category"
	},
	children: [
		{
			path: "/category/index",
			component: () => import("@/views/category/index.vue"),
			name: "categoryIndex",
			meta: {
				title: "分类列表",
				icon: "category"
			}
		}
	]
};
