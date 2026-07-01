<template>
	<div class="article-container">
		<!-- 搜索 & 筛选区 -->
		<el-card shadow="never" class="search-card">
			<el-form :inline="true" :model="queryForm">
				<el-form-item label="文章标题">
					<el-input
						v-model="queryForm.title"
						placeholder="请输入文章标题搜索"
						clearable
						style="width: 240px"
						@keyup.enter="handleSearch"
					/>
				</el-form-item>
				<el-form-item label="状态">
					<el-select
						v-model="queryForm.status"
						placeholder="全部"
						clearable
						style="width: 140px"
						@change="handleSearch"
					>
						<el-option label="全部" value="" />
						<el-option label="已发布" :value="1" />
						<el-option label="草稿" :value="0" />
					</el-select>
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

		<!-- 操作栏 -->
		<el-card shadow="never" class="toolbar-card">
			<div class="toolbar">
				<div class="toolbar-left">
					<el-button type="primary" @click="handleAdd">
						<el-icon><Plus /></el-icon>
						新建文章
					</el-button>
					<el-button
						type="danger"
						:disabled="selectedIds.length === 0"
						@click="handleBatchDelete"
					>
						<el-icon><Delete /></el-icon>
						批量删除
					</el-button>
				</div>
				<div class="toolbar-right">
					<span class="total-info">共 {{ articleStore.total }} 篇文章</span>
				</div>
			</div>
		</el-card>

		<!-- 文章表格 -->
		<el-card shadow="never" class="table-card">
			<el-table
				v-loading="articleStore.loading"
				:data="articleStore.list"
				border
				stripe
				style="width: 100%"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="50" align="center" />
				<el-table-column prop="id" label="ID" width="70" align="center" />
				<el-table-column prop="title" label="文章标题" min-width="200" show-overflow-tooltip />
				<el-table-column prop="category" label="分类" width="120" align="center">
					<template #default="{ row }">
						<el-tag type="info" size="small">{{ row.category }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="标签" width="180">
					<template #default="{ row }">
						<el-tag
							v-for="tag in row.tags"
							:key="tag"
							size="small"
							style="margin-right: 4px"
						>{{ tag }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="状态" width="100" align="center">
					<template #default="{ row }">
						<el-tag :type="row.status === 1 ? 'success' : 'warning'" size="small">
							{{ row.status === 1 ? '已发布' : '草稿' }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="views" label="阅读量" width="100" align="center" sortable />
				<el-table-column prop="createTime" label="创建时间" width="170" align="center" />
				<el-table-column label="操作" width="220" align="center" fixed="right">
					<template #default="{ row }">
						<el-button type="primary" link size="small" @click="handleEdit(row)">
							<el-icon><Edit /></el-icon>
							编辑
						</el-button>
						<el-button type="success" link size="small" @click="handlePreview(row)">
							<el-icon><View /></el-icon>
							预览
						</el-button>
						<el-popconfirm
							title="确定要删除这篇文章吗？"
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

			<!-- 分页 -->
			<div class="pagination-wrapper">
				<el-pagination
					v-model:current-page="queryForm.page"
					v-model:page-size="queryForm.pageSize"
					:page-sizes="[5, 10, 20, 50]"
					:total="articleStore.total"
					layout="total, sizes, prev, pager, next, jumper"
					background
					@size-change="handleSearch"
					@current-change="handleSearch"
				/>
			</div>
		</el-card>
	</div>
</template>

<style lang="scss" scoped>
.article-container {
	padding: 0;

	.search-card {
		margin-bottom: 16px;

		:deep(.el-card__body) {
			padding: 16px 20px 0;
		}
	}

	.toolbar-card {
		margin-bottom: 16px;

		:deep(.el-card__body) {
			padding: 12px 20px;
		}
	}

	.toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		&-left {
			display: flex;
			gap: 8px;
		}

		&-right {
			.total-info {
				font-size: 14px;
				color: #909399;
			}
		}
	}

	.table-card {
		:deep(.el-card__body) {
			padding: 20px;
		}
	}

	.pagination-wrapper {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}
}
</style>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Search, Refresh, Plus, Delete, Edit, View } from "@element-plus/icons";
import { ElMessage, ElMessageBox } from "element-plus";
import { useArticleStore } from "@/stores/article";

const router = useRouter();

const articleStore = useArticleStore();

// 查询表单
const queryForm = reactive({
	page: 1,
	pageSize: 10,
	title: "",
	status: ""
});

// 选中的行
const selectedIds = reactive([]);

const handleSelectionChange = (selection) => {
	selectedIds.splice(0, selectedIds.length);
	selection.forEach(item => selectedIds.push(item.id));
};

// 搜索
const handleSearch = () => {
	queryForm.page = queryForm.page || 1;
	const params = {
		page: queryForm.page,
		pageSize: queryForm.pageSize,
		title: queryForm.title || undefined,
		status: queryForm.status !== "" ? queryForm.status : undefined
	};
	articleStore.fetchList(params);
};

// 重置
const handleReset = () => {
	queryForm.title = "";
	queryForm.status = "";
	queryForm.page = 1;
	handleSearch();
};

// 单篇删除
const handleDelete = async (row) => {
	await articleStore.remove(row.id);
	handleSearch();
};

// 批量删除
const handleBatchDelete = async () => {
	if (selectedIds.length === 0) return;
	try {
		await ElMessageBox.confirm(
			`确定要删除选中的 ${selectedIds.length} 篇文章吗？`,
			"批量删除",
			{ confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }
		);
		await articleStore.batchRemove([...selectedIds]);
		selectedIds.splice(0, selectedIds.length);
		handleSearch();
	} catch {
		// 用户取消
	}
};

// 编辑
const handleEdit = (row) => {
	router.push(`/article/editor/${row.id}`);
};

// 预览
const handlePreview = (row) => {
	ElMessage.info(`预览文章：${row.title}（功能待开发）`);
};

// 新建
const handleAdd = () => {
	router.push("/article/editor");
};

onMounted(() => {
	handleSearch();
});
</script>
