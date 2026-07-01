import { defineStore } from "pinia";
import { getUserInfo, updateUserInfo, uploadAvatar, changePassword } from "@/api/profile";
import { ElMessage } from "element-plus";

export const useProfileStore = defineStore("profile", {
	state: () => ({
		userInfo: {},
		loading: false
	}),
	actions: {
		async fetchUserInfo() {
			this.loading = true;
			try {
				const res = await getUserInfo();
				this.userInfo = res.obj || {};
			} catch {
				this.userInfo = {};
			} finally {
				this.loading = false;
			}
		},
		async updateInfo(data) {
			try {
				const res = await updateUserInfo(data);
				this.userInfo = { ...this.userInfo, ...res.obj };
				ElMessage.success("个人信息更新成功");
				return true;
			} catch {
				return false;
			}
		},
		async updateAvatar(avatar) {
			try {
				await uploadAvatar({ avatar });
				this.userInfo.avatar = avatar;
				ElMessage.success("头像更新成功");
				return true;
			} catch {
				return false;
			}
		},
		async doChangePassword(data) {
			try {
				await changePassword(data);
				ElMessage.success("密码修改成功");
				return true;
			} catch {
				return false;
			}
		}
	}
});
