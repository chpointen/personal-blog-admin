/** 当路由表过于庞大时，你可以将其拆分为多个小型模块**/
/* 权限管理路由树 */
import Layout from "@/layout";

export default {
	path: "/adminAuth",
	component: Layout,
	redirect: "/adminAuth/getRoleList",
	alwaysShow: true, // 始终显示主菜单
	name: "adminAuth",
	meta: {
		title: "权限管理",
		icon: "permission"
	},
	children: [
		{
			path: "/adminAuth/getRoleList",
			component: () => import("@/views/permissions-page/roleList.vue"),
			name: "getRoleList",
			meta: { title: "角色列表", icon: "role" }
		},
		{
			path: "/adminAuth/adminList",
			component: () => import("@/views/permissions-page/accountList.vue"),
			name: "adminList",
			meta: { title: "账号列表", icon: "personnel" }
		},
		{
			path: "/adminAuth/permissionList",
			component: () => import("@/views/permissions-page/permissionList.vue"),
			name: "permissionList",
			meta: { title: "权限列表", icon: "permission" }
		},
		{
			path: "/account/detail",
			name: "accountDetail",
			component: () => import("@/views/permissions-page/accountDetail.vue"),
			meta: { title: "账号详情", icon: "personnel" },
			hidden: true// true不显示在侧边栏

		}

	]
};