import axios from "@/utils/axios";

export function getTagList(params) {
	return axios({
		url: "/tag/list",
		method: "post",
		data: params
	});
}

export function createTag(params) {
	return axios({
		url: "/tag/create",
		method: "post",
		data: params
	});
}

export function updateTag(params) {
	return axios({
		url: "/tag/update",
		method: "post",
		data: params
	});
}

export function deleteTag(id) {
	return axios({
		url: "/tag/delete",
		method: "post",
		data: { id }
	});
}

export function toggleTagStatus(data) {
	return axios({
		url: "/tag/toggleStatus",
		method: "post",
		data
	});
}
