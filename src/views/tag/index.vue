<template>
	<div class="tag-container">
		<el-card shadow="never" class="search-card">
			<el-form :inline="true" :model="queryForm">
				<el-form-item label="标签名称">
					<el-input
						v-model="queryForm.name"
						placeholder="请输入标签名称搜索"
						clearable
						style="width: 220px"
						@keyup.enter="handleSearch"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleSearch">
						<el-icon><Search /></el-icon>
						搜索
					</el-button>
					<el-button @click="handleReset">
						<el-icon><Refresh /></el-icon>
						重置
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card shadow="never" class="toolbar-card">
			<div class="toolbar">
				<div class="toolbar-left">
					<el-button type="primary" @click="handleAdd">
						<el-icon><Plus /></el-icon>
						新增标签
					</el-button>
				</div>
				<div class="toolbar-right">
					<span class="total-info">共 {{ tagStore.total }} 个标签</span>
				</div>
			</div>
		</el-card>

		<el-card shadow="never" class="table-card">
			<el-table
				v-loading="tagStore.loading"
				:data="tagStore.list"
				row-key="id"
				border
				stripe
				style="width: 100%"
			>
				<el-table-column prop="id" label="ID" width="70" align="center" />
				<el-table-column prop="name" label="标签名称" min-width="140" />
				<el-table-column prop="slug" label="别名" width="140" show-overflow-tooltip />
				<el-table-column prop="article_count" label="文章数" width="90" align="center" />
				<el-table-column label="状态" width="100" align="center">
					<template #default="{ row }">
						<el-switch
							v-model="row.status"
							:active-value="1"
							:inactive-value="0"
							:loading="statusLoadingMap[row.id]"
							inline-prompt
							active-text="启用"
							inactive-text="禁用"
							@change="handleStatusChange(row)"
						/>
					</template>
				</el-table-column>
				<el-table-column prop="sort_order" label="排序" width="80" align="center" />
				<el-table-column prop="create_time" label="创建时间" width="170" align="center" />
				<el-table-column label="操作" width="180" align="center" fixed="right">
					<template #default="{ row }">
						<el-button type="primary" link size="small" @click="handleEdit(row)">
							<el-icon><Edit /></el-icon>
							编辑
						</el-button>
						<el-popconfirm
							title="确定要删除该标签吗？"
							confirm-button-text="确定"
							cancel-button-text="取消"
							@confirm="handleDelete(row)"
						>
							<template #reference>
								<el-button type="danger" link size="small">
									<el-icon><Delete /></el-icon>
									删除
								</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>

			<div class="pagination-wrapper">
				<el-pagination
					v-model:current-page="queryForm.page"
					v-model:page-size="queryForm.pageSize"
					:page-sizes="[10, 20, 50]"
					:total="tagStore.total"
					layout="total, sizes, prev, pager, next, jumper"
					background
					@size-change="handleSearch"
					@current-change="handleSearch"
				/>
			</div>
		</el-card>

		<el-dialog
			v-model="dialogVisible"
			:title="dialogTitle"
			width="520px"
			:close-on-click-modal="false"
			@closed="resetForm"
		>
			<el-form
				ref="formRef"
				:model="formData"
				:rules="formRules"
				label-width="80px"
			>
				<el-form-item label="标签名称" prop="name">
					<el-input
						v-model="formData.name"
						placeholder="请输入标签名称"
						maxlength="20"
						show-word-limit
						@input="onNameInput"
					/>
				</el-form-item>
				<el-form-item label="标签别名" prop="slug">
					<el-input
						v-model="formData.slug"
						placeholder="URL 友好别名，如 vue3"
						maxlength="50"
					/>
				</el-form-item>
				<el-form-item label="排序" prop="sort_order">
					<el-input-number
						v-model="formData.sort_order"
						:min="0"
						:max="999"
						controls-position="right"
						style="width: 140px"
					/>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="handleSubmit" :loading="submitting">
					{{ isEditMode ? '保存修改' : '确认新增' }}
				</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<style lang="scss" scoped>
.tag-container {
	padding: 0;

	.search-card {
		margin-bottom: 16px;
		:deep(.el-card__body) { padding: 16px 20px 0; }
	}

	.toolbar-card {
		margin-bottom: 16px;
		:deep(.el-card__body) { padding: 12px 20px; }
	}

	.toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		&-left { display: flex; gap: 8px; }
		&-right .total-info { font-size: 14px; color: #909399; }
	}

	.table-card {
		:deep(.el-card__body) { padding: 20px; }
	}

	.pagination-wrapper {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}
}
</style>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { Search, Refresh, Plus, Delete, Edit } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import { useTagStore } from "@/stores/tag";

const tagStore = useTagStore();

const queryForm = reactive({
	page: 1,
	pageSize: 20,
	name: ""
});

const dialogVisible = ref(false);
const isEditMode = ref(false);
const submitting = ref(false);
const formRef = ref(null);

const dialogTitle = computed(() => isEditMode.value ? "编辑标签" : "新增标签");

const formData = reactive({
	id: null,
	name: "",
	slug: "",
	sort_order: 0
});

const formRules = {
	name: [{ required: true, message: "请输入标签名称", trigger: "blur" }],
	slug: [{ required: true, message: "请输入标签别名", trigger: "blur" }],
	sort_order: [{ required: true, message: "请输入排序值", trigger: "blur" }]
};

const onNameInput = (val) => {
	if (!isEditMode.value || !formData.slug) {
		formData.slug = val
			.toLowerCase()
			.replace(/[^a-z0-9\u4e00-\u9fa5]/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-|-$/g, "");
	}
};

const handleSearch = () => {
	queryForm.page = queryForm.page || 1;
	tagStore.fetchList({
		page: queryForm.page,
		pageSize: queryForm.pageSize,
		name: queryForm.name || undefined
	});
};

const handleReset = () => {
	queryForm.name = "";
	queryForm.page = 1;
	handleSearch();
};

const handleAdd = () => {
	isEditMode.value = false;
	dialogVisible.value = true;
};

const handleEdit = (row) => {
	isEditMode.value = true;
	formData.id = row.id;
	formData.name = row.name;
	formData.slug = row.slug;
	formData.sort_order = row.sort_order;
	dialogVisible.value = true;
};

const handleSubmit = async () => {
	const valid = await formRef.value?.validate().catch(() => false);
	if (!valid) return;
	submitting.value = true;
	const data = { ...formData };
	const success = isEditMode.value
		? await tagStore.update(data)
		: await tagStore.create(data);
	submitting.value = false;
	if (success) {
		dialogVisible.value = false;
		handleSearch();
	}
};

const resetForm = () => {
	formData.id = null;
	formData.name = "";
	formData.slug = "";
	formData.sort_order = 0;
	formRef.value?.resetFields();
};

const handleDelete = async (row) => {
	const success = await tagStore.remove(row.id);
	if (success) {
		handleSearch();
	}
};

const statusLoadingMap = ref({});

const handleStatusChange = async (row) => {
	const previousStatus = row.status === 1 ? 0 : 1;

	statusLoadingMap.value = { ...statusLoadingMap.value, [row.id]: true };

	try {
		await tagStore.toggleStatus(row.id, row.status);
		ElMessage.success("状态更新成功");

		const index = tagStore.list.findIndex(item => item.id === row.id);
		if (index !== -1) {
			tagStore.list[index].status = row.status;
		}
	} catch {
		row.status = previousStatus;
		ElMessage.error("状态更新失败");
	} finally {
		statusLoadingMap.value = { ...statusLoadingMap.value, [row.id]: false };
	}
};

onMounted(() => {
	handleSearch();
});
</script>
