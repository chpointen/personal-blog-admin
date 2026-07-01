import axios from "@/utils/axios";

/**
 * 获取文章列表
 * @param {object} params — { page, pageSize, title?, status? }
 */
export function getArticleList(params) {
	return axios({
		url: "/article/list",
		method: "post",
		data: params
	});
}

/**
 * 删除单篇文章
 * @param {number|string} id
 */
export function deleteArticle(id) {
	return axios({
		url: "/article/delete",
		method: "post",
		data: { id }
	});
}

/**
 * 批量删除文章
 * @param {Array<number|string>} ids
 */
export function batchDeleteArticle(ids) {
	return axios({
		url: "/article/batchDelete",
		method: "post",
		data: { ids }
	});
}

/**
 * 获取文章详情
 * @param {number|string} id
 */
export function getArticleDetail(id) {
	return axios({
		url: "/article/detail",
		method: "post",
		data: { id }
	});
}

/**
 * 创建文章（保存草稿或发布）
 * @param {object} params — { title, content, category_id, category_name, tags, status, summary }
 */
export function createArticle(params) {
	return axios({
		url: "/article/create",
		method: "post",
		data: params
	});
}

/**
 * 更新文章（保存草稿或发布）
 * @param {object} params — { id, title, content, category_id, category_name, tags, status, summary }
 */
export function updateArticle(params) {
	return axios({
		url: "/article/update",
		method: "post",
		data: params
	});
}
