import { defineStore } from "pinia";
import { privateRoutes, publicRoutes } from "@/router";

function hasPermission(roles, route) {
	let hasRouter = false;
	for (let i = 0; i < roles.length; i++) {
		if (roles[i].url === route.path || "/" + roles[i].url === route.path) {
			hasRouter = true;
			break;
		}
	}
	return hasRouter;
}

export function filterPrivateRoutes(routes, roles) {
	const res = [];
	routes.forEach(route => {
		const tmp = { ...route };
		// hidden 路由不参与权限过滤（不在侧边栏显示，但需要可访问，如编辑页）
		const isHidden = tmp.hidden;
		if (isHidden || hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterPrivateRoutes(tmp.children, roles);
			}
			res.push(tmp);
		}
	});
	return res;
}

export const usePermissionStore = defineStore("permission", {
	state: () => ({
		routes: publicRoutes
	}),
	actions: {
		generateRoutes(roles) {
			return new Promise(resolve => {
				const accessedRoutes = filterPrivateRoutes(privateRoutes, roles);
				accessedRoutes.push({
					path: "/:catchAll(.*)",
					redirect: "/404"
				});
				this.routes = [...publicRoutes, ...accessedRoutes];
				resolve(accessedRoutes);
			});
		}
	}
});
