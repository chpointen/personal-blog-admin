import { defineStore } from "pinia";
import { login, getPermission } from "@/api/api";
import { setItem, getItem, removeAllItem } from "@/utils/storage";
import { TOKEN, USERINFO } from "@/constant";
import { setTimeStamp } from "@/utils/auth";
import { formatPermissionList } from "@/utils/index";
import { ElMessage } from "element-plus";
import { useAppStore } from "./app";

export const useUserStore = defineStore("user", {
	state: () => ({
		token: getItem(TOKEN) || "",
		userInfo: getItem(USERINFO) || {},
		roles: [],
		buttons: []
	}),
	getters: {
		hasRoles: state => {
			return state.roles && state.roles.length > 0;
		}
	},
	actions: {
		setToken(token) {
			this.token = token;
			setItem(TOKEN, token);
		},
		setUserInfo(userInfo) {
			this.userInfo = userInfo;
			setItem(USERINFO, userInfo);
		},
		login(userInfo) {
			const { username, password, captcha_code, code_key } = userInfo;
			return new Promise((resolve, reject) => {
				login({
					username,
					password,
					captcha_code,
					code_key
				})
					.then(data => {
						this.setToken(data.obj.sys_token);
						this.setUserInfo(data.obj);
						setTimeStamp();
						resolve();
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		getPermissionData() {
			return new Promise((resolve, reject) => {
				getPermission()
					.then(data => {
						const obj = formatPermissionList(data.obj);
						const role_arr = obj.role_arr;
						const button_arr = obj.button_arr;
						const info = { roles: role_arr };
						if (role_arr.length == 0) {
							ElMessage.error("您登录的账号暂无权限！");
							this.logout();
						}
						this.roles = role_arr;
						this.buttons = button_arr;
						resolve(info);
					})
					.catch(err => {
						// silent
					});
			});
		},
		logout() {
			// 遍历用户菜单权限，逐条 router.removeRoute(name)
			if (this.hasRoles) {
				this.roles.forEach(menu => {
					const url = menu.url;
					const i = url.lastIndexOf("/");
					const name = url.substring(i + 1, url.length);
					import("@/router").then(mod => {
						mod.default.removeRoute(name);
					});
				});
			}
			this.token = "";
			this.userInfo = {};
			this.roles = [];
			this.buttons = [];
			const appStore = useAppStore();
			appStore.removeTagsView({ type: "all" });
			removeAllItem();
			import("@/router").then(mod => {
				mod.default.push("/login");
			});
		}
	}
});
