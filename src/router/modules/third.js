/** 当路由表过于庞大时，你可以将其拆分为多个小型模块**/
/* 三方库路由树 */
import layout from "@/layout";

export default {
	path: "/third",
	component: layout,
	redirect: "/third/editor",
	alwaysShow: true, // 始终显示主菜单
	name: "third",
	meta: {
		title: "三方库",
		icon: "article"
	},
	children: [
		{
			path: "/third/editor",
			component: () => import("@/views/third-page/editor/index.vue"),
			name: "editor",
			meta: {
				title: "富文本", icon: "article-ranking"
			}
		}
	]
};