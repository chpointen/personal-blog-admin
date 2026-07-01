import axios from "@/utils/axios";

export function getUserInfo() {
	return axios({ url: "/user/info", method: "post" });
}

export function updateUserInfo(params) {
	return axios({ url: "/user/update", method: "post", data: params });
}

export function uploadAvatar(params) {
	return axios({ url: "/user/avatar", method: "post", data: params });
}

export function changePassword(params) {
	return axios({ url: "/user/password", method: "post", data: params });
}
