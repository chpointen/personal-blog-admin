import axios from "@/utils/axios";

/**
 * 获取分类列表
 * @param {object} params — { page, pageSize, name? }
 */
export function getCategoryList(params) {
	return axios({
		url: "/category/list",
		method: "post",
		data: params
	});
}

/**
 * 新增分类
 * @param {object} params — { name, slug, description, sort_order }
 */
export function createCategory(params) {
	return axios({
		url: "/category/create",
		method: "post",
		data: params
	});
}

/**
 * 编辑分类
 * @param {object} params — { id, name, slug, description, sort_order }
 */
export function updateCategory(params) {
	return axios({
		url: "/category/update",
		method: "post",
		data: params
	});
}

/**
 * 删除分类
 * @param {number|string} id
 */
export function deleteCategory(id) {
	return axios({
		url: "/category/delete",
		method: "post",
		data: { id }
	});
}

/**
 * 切换分类状态
 * @param {object} data — { id, status }
 */
export function toggleCategoryStatus(data) {
	return axios({
		url: "/category/toggleStatus",
		method: "post",
		data
	});
}
