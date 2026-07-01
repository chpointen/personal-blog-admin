import Layout from "@/layout";

export default {
	path: "/tag",
	component: Layout,
	redirect: "/tag/index",
	alwaysShow: true,
	name: "tag",
	meta: {
		title: "标签管理",
		icon: "tag"
	},
	children: [
		{
			path: "/tag/index",
			component: () => import("@/views/tag/index.vue"),
			name: "tagIndex",
			meta: {
				title: "标签列表",
				icon: "tag"
			}
		}
	]
};
