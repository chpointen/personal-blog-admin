import { defineStore } from "pinia";
import { getArticleList, deleteArticle, batchDeleteArticle, getArticleDetail, createArticle, updateArticle } from "@/api/article";
import { ElMessage } from "element-plus";

export const useArticleStore = defineStore("article", {
	state: () => ({
		list: [],
		total: 0,
		loading: false,
		currentArticle: null,
		editorLoading: false
	}),
	actions: {
		/**
		 * 获取文章列表
		 * @param {object} params — { page, pageSize, title?, status? }
		 */
		async fetchList(params = {}) {
			this.loading = true;
			try {
				const res = await getArticleList(params);
				this.list = res.obj.list || [];
				this.total = res.obj.total || 0;
			} catch {
				this.list = [];
				this.total = 0;
			} finally {
				this.loading = false;
			}
		},
		/**
		 * 删除单篇文章
		 */
		async remove(id) {
			try {
				await deleteArticle(id);
				ElMessage.success("删除成功");
			} catch {
				// error handled in axios interceptor
			}
		},
		/**
		 * 批量删除文章
		 */
		async batchRemove(ids) {
			try {
				await batchDeleteArticle(ids);
				ElMessage.success(`成功删除 ${ids.length} 篇文章`);
			} catch {
				// error handled in axios interceptor
			}
		},
		/**
		 * 获取文章详情（用于编辑）
		 */
		async fetchDetail(id) {
			this.editorLoading = true;
			try {
				const res = await getArticleDetail(id);
				this.currentArticle = res.obj;
				return res.obj;
			} catch {
				this.currentArticle = null;
				return null;
			} finally {
				this.editorLoading = false;
			}
		},
		/**
		 * 保存文章（新建或更新，自动判断）
		 * @param {object} data — 文章表单数据
		 */
		async save(data) {
			try {
				const res = data.id
					? await updateArticle(data)
					: await createArticle(data);
				ElMessage.success(res.status.error_msg);
				return res.obj;
			} catch {
				return null;
			}
		},
		/**
		 * 清除当前编辑的文章
		 */
		clearCurrent() {
			this.currentArticle = null;
		}
	}
});
