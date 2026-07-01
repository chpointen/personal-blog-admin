import {
	createRouter,
	createWebHashHistory
} from "vue-router";

import layout from "@/layout";
import permissions from "./modules/permissions";
import article from "./modules/article";
import category from "./modules/category";
import tag from "./modules/tag";
import profile from "./modules/profile";

/**
 * 私有路由表
 */
export const privateRoutes = [
	permissions,
	article,
	category,
	tag,
	profile
];
/**
 * 公开路由表
 */
export const publicRoutes = [
	{
		path: "/login",
		component: () => import("@/views/login/index")
	},
	{
		path: "/",
		// 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
		component: layout,
		redirect: "/home",
		children: [
			{
				path: "/home",
				name: "home",
				component: () => import("@/views/dashboard/index.vue"),
				meta: { title: "首页", icon: "home", affix: true }, // affix=true,tagViews右侧没有关闭按钮
				hidden: true// true不显示在侧边栏
			},
			{
				path: "/404",
				name: "404",
				component: () => import("@/views/error-page/404")
			},
			{
				path: "/401",
				name: "401",
				component: () => import("@/views/error-page/401")
			}
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	// routes: [...publicRoutes, ...privateRoutes]
	routes: publicRoutes

});

export default router;