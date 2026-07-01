import Layout from "@/layout";

export default {
	path: "/profile",
	component: Layout,
	redirect: "/profile/index",
	name: "profile",
	meta: {
		title: "个人设置",
		icon: "setting"
	},
	children: [
		{
			path: "/profile/index",
			component: () => import("@/views/profile/index.vue"),
			name: "profileIndex",
			meta: {
				title: "个人设置",
				icon: "setting",
				activeMenu: "/profile"
			},
			hidden: true
		}
	]
};
