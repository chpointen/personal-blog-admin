import { defineStore } from "pinia";
import { getCategoryList, createCategory, updateCategory, deleteCategory, toggleCategoryStatus } from "@/api/category";
import { ElMessage } from "element-plus";

export const useCategoryStore = defineStore("category", {
	state: () => ({
		list: [],
		total: 0,
		loading: false,
		allCategories: []  // 不分页的全量列表，供下拉选择等场景使用
	}),
	actions: {
		/**
		 * 获取分类列表（分页）
		 */
		async fetchList(params = {}) {
			this.loading = true;
			try {
				const res = await getCategoryList(params);
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
		 * 获取全部分类（不分页，供下拉选择）
		 */
		async fetchAll() {
			try {
				const res = await getCategoryList({ page: 1, pageSize: 100 });
				this.allCategories = (res.obj.list || []).filter(c => c.status === 1);
			} catch {
				this.allCategories = [];
			}
		},
		/**
		 * 新增分类
		 */
		async create(data) {
			try {
				await createCategory(data);
				ElMessage.success("分类创建成功");
				return true;
			} catch {
				return false;
			}
		},
		/**
		 * 编辑分类
		 */
		async update(data) {
			try {
				await updateCategory(data);
				ElMessage.success("分类更新成功");
				return true;
			} catch {
				return false;
			}
		},
		/**
		 * 删除分类
		 */
		async remove(id) {
			try {
				await deleteCategory(id);
				ElMessage.success("删除成功");
				return true;
			} catch (e) {
				// 有关联文章时 mock 返回 error，axios 拦截器已弹窗
				return false;
			}
		},
		/**
		 * 切换启用/禁用
		 * @param {number} id
		 * @param {number} status — 目标状态 0/1
		 */
		async toggleStatus(id, status) {
			const res = await toggleCategoryStatus({ id, status });
			// 更新本地 list
			const item = this.list.find(c => c.id === id);
			if (item) item.status = status;
			// 强制触发响应式（el-table 依赖数组引用变化）
			this.list = [...this.list];
			// 同步 allCategories（即时过滤，已挂载的编辑页不再显示禁用分类）
			if (status === 0) {
				this.allCategories = this.allCategories.filter(c => c.id !== id);
			} else {
				const inAll = this.allCategories.find(c => c.id === id);
				if (!inAll && item) {
					this.allCategories = [...this.allCategories, { ...item, status: 1 }];
				} else if (inAll) {
					inAll.status = 1;
					this.allCategories = [...this.allCategories];
				}
			}
			return res;
		}
	}
});
