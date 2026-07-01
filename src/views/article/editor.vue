<template>
	<div class="article-editor">
		<!-- 顶部操作栏 -->
		<el-card shadow="never" class="header-card">
			<div class="header-bar">
				<div class="header-left">
					<el-button @click="handleBack">
						<el-icon><ArrowLeft /></el-icon>
						返回列表
					</el-button>
					<span class="page-title">{{ isEdit ? '编辑文章' : '新建文章' }}</span>
				</div>
				<div class="header-right">
					<el-button @click="handleSaveDraft" :loading="saving">
						<el-icon><Document /></el-icon>
						保存草稿
					</el-button>
					<el-button type="primary" @click="handlePublish" :loading="saving">
						<el-icon><Upload /></el-icon>
						发布文章
					</el-button>
				</div>
			</div>
		</el-card>

		<!-- 表单区 -->
		<el-card shadow="never" class="form-card" v-loading="articleStore.editorLoading">
			<el-form :model="form" label-width="80px" class="editor-form">
				<el-row :gutter="20">
					<el-col :span="16">
						<el-form-item label="文章标题" required>
							<el-input
								v-model="form.title"
								placeholder="请输入文章标题"
								maxlength="100"
								show-word-limit
							/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="分类" required>
							<el-select
								v-model="form.category_id"
								placeholder="请选择分类"
								style="width: 100%"
								@change="onCategoryChange"
							>
								<el-option
									v-for="item in categories"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								/>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-form-item label="文章标签">
					<el-select
						v-model="form.tags"
						multiple
						filterable
						placeholder="请选择标签"
						style="width: 100%"
					>
						<el-option
							v-for="item in availableTags"
							:key="item.id"
							:label="item.name"
							:value="item.name"
						/>
					</el-select>
				</el-form-item>

				<el-form-item label="文章摘要">
					<el-input
						v-model="form.summary"
						type="textarea"
						:rows="2"
						placeholder="请输入文章摘要，用于列表展示（选填）"
						maxlength="200"
						show-word-limit
					/>
				</el-form-item>

				<el-form-item label="文章内容" required>
					<div class="editor-wrapper">
						<div id="wangeditor-box"></div>
					</div>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<style lang="scss" scoped>
.article-editor {
	padding: 0;

	.header-card {
		margin-bottom: 16px;

		:deep(.el-card__body) {
			padding: 12px 20px;
		}
	}

	.header-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.header-left {
			display: flex;
			align-items: center;
			gap: 12px;

			.page-title {
				font-size: 16px;
				font-weight: 600;
				color: #303133;
			}
		}

		.header-right {
			display: flex;
			gap: 8px;
		}
	}

	.form-card {
		:deep(.el-card__body) {
			padding: 24px;
		}
	}

	.editor-form {
		.editor-wrapper {
			width: 100%;
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			overflow: hidden;
		}
	}
}
</style>

<script setup>
import { reactive, ref, computed, onMounted, onActivated, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, Document, Upload } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import { useArticleStore } from "@/stores/article";
import { useCategoryStore } from "@/stores/category";
import { useTagStore } from "@/stores/tag";
import E from "wangeditor";

const route = useRoute();
const router = useRouter();
const articleStore = useArticleStore();
const categoryStore = useCategoryStore();
const tagStore = useTagStore();

const isEdit = computed(() => !!route.params.id);

const saving = ref(false);

const categories = computed(() => categoryStore.allCategories);

const availableTags = computed(() => tagStore.allTags);

const form = reactive({
	id: null,
	title: "",
	content: "",
	category_id: 1,
	category_name: "前端开发",
	tags: [],
	status: 0,
	summary: ""
});

// 分类变更
const onCategoryChange = (val) => {
	const cat = categories.value.find(c => c.id === val);
	form.category_name = cat ? cat.name : "";
};

// WangEditor v4 实例
let editor = null;

const initEditor = () => {
	const el = document.querySelector("#wangeditor-box");
	if (!el) return;

	editor = new E(el);
	editor.config.zIndex = 1;
	editor.config.placeholder = "请输入文章内容...";
	editor.config.showMenuTooltips = true;
	editor.config.menuTooltipPosition = "down";
	editor.config.height = 500;
	editor.config.uploadImgMaxLength = 1;
	editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
	editor.config.showLinkImg = false;
	editor.config.menus = [
		"head",
		"bold",
		"fontSize",
		"fontName",
		"italic",
		"underline",
		"strikeThrough",
		"indent",
		"lineHeight",
		"foreColor",
		"backColor",
		"link",
		"list",
		"todo",
		"justify",
		"quote",
		"emoticon",
		"image",
		"table",
		"code",
		"splitLine",
		"undo",
		"redo"
	];
	// 内容变化时同步到 form
	editor.config.onchange = (html) => {
		form.content = html;
	};
	// 模拟图片上传：转 base64
	editor.config.customUploadImg = (resultFiles, insertImgFn) => {
		resultFiles.forEach(file => {
			const reader = new FileReader();
			reader.onload = (e) => {
				insertImgFn(e.target.result);
			};
			reader.readAsDataURL(file);
		});
	};

	editor.create();
	// 如果有初始内容，回填
	if (form.content) {
		editor.txt.html(form.content);
	}
};

// 加载编辑数据
const loadArticle = async () => {
	if (!isEdit.value) return;
	const article = await articleStore.fetchDetail(route.params.id);
	if (article) {
		form.id = article.id;
		form.title = article.title;
		form.category_id = article.category_id;
		form.category_name = article.category_name;
		form.tags = [...(article.tags || [])];
		form.status = article.status;
		form.summary = article.summary || "";
		// 回填编辑器内容
		form.content = article.content || "";
		if (editor) {
			editor.txt.html(form.content);
		}
	} else {
		ElMessage.error("文章不存在");
		router.push("/article/index");
	}
};

// 保存草稿
const handleSaveDraft = async () => {
	if (!validate()) return;
	saving.value = true;
	form.status = 0;
	const result = await articleStore.save({ ...form });
	saving.value = false;
	if (result) {
		form.id = result.id;
	}
};

// 发布
const handlePublish = async () => {
	if (!validate()) return;
	saving.value = true;
	form.status = 1;
	const result = await articleStore.save({ ...form });
	saving.value = false;
	if (result) {
		form.id = result.id;
		router.push("/article/index");
	}
};

// 表单校验
const validate = () => {
	if (!form.title.trim()) {
		ElMessage.warning("请输入文章标题");
		return false;
	}
	if (!form.category_id) {
		ElMessage.warning("请选择文章分类");
		return false;
	}
	const content = editor ? editor.txt.html() : form.content;
	if (!content || content === "<p><br></p>") {
		ElMessage.warning("请输入文章内容");
		return false;
	}
	form.content = content;
	return true;
};

// 返回列表
const handleBack = () => {
	router.push("/article/index");
};

onMounted(async () => {
	await categoryStore.fetchAll();
	await tagStore.fetchAll();
	initEditor();
	loadArticle();
});

// keep-alive 缓存后重新激活时刷新分类和标签列表（确保禁用项已被过滤）
onActivated(async () => {
	await categoryStore.fetchAll();
	await tagStore.fetchAll();
});

onBeforeUnmount(() => {
	if (editor) {
		editor.destroy();
		editor = null;
	}
	articleStore.clearCurrent();
});
</script>
