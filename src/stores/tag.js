import { defineStore } from "pinia";
import { getTagList, createTag, updateTag, deleteTag, toggleTagStatus } from "@/api/tag";
import { ElMessage } from "element-plus";

export const useTagStore = defineStore("tag", {
	state: () => ({
		list: [],
		total: 0,
		loading: false,
		allTags: []
	}),
	actions: {
		async fetchList(params = {}) {
			this.loading = true;
			try {
				const res = await getTagList(params);
				this.list = res.obj.list || [];
				this.total = res.obj.total || 0;
			} catch {
				this.list = [];
				this.total = 0;
			} finally {
				this.loading = false;
			}
		},
		async fetchAll() {
			try {
				const res = await getTagList({ page: 1, pageSize: 100 });
				this.allTags = (res.obj.list || []).filter(t => t.status === 1);
			} catch {
				this.allTags = [];
			}
		},
		async create(data) {
			try {
				await createTag(data);
				ElMessage.success("标签创建成功");
				return true;
			} catch {
				return false;
			}
		},
		async update(data) {
			try {
				await updateTag(data);
				ElMessage.success("标签更新成功");
				return true;
			} catch {
				return false;
			}
		},
		async remove(id) {
			try {
				await deleteTag(id);
				ElMessage.success("删除成功");
				return true;
			} catch {
				return false;
			}
		},
		async toggleStatus(id, status) {
			const res = await toggleTagStatus({ id, status });
			const item = this.list.find(t => t.id === id);
			if (item) item.status = status;
			this.list = [...this.list];
			if (status === 0) {
				this.allTags = this.allTags.filter(t => t.id !== id);
			} else {
				const inAll = this.allTags.find(t => t.id === id);
				if (!inAll && item) {
					this.allTags = [...this.allTags, { ...item, status: 1 }];
				} else if (inAll) {
					inAll.status = 1;
					this.allTags = [...this.allTags];
				}
			}
			return res;
		}
	}
});
