<template>
	<div class="profile-container" v-loading="profileStore.loading">
		<el-row :gutter="20">
			<!-- 左侧用户信息卡片 -->
			<el-col :xs="24" :md="8">
				<el-card shadow="never" class="user-card">
					<div class="avatar-section">
						<el-upload
							class="avatar-upload"
							action="#"
							:show-file-list="false"
							:auto-upload="false"
							accept="image/*"
							:on-change="handleAvatarChange"
						>
							<el-avatar :size="120" :src="profileStore.userInfo.avatar" class="avatar-img" />
							<div class="avatar-mask">
								<el-icon :size="24"><Camera /></el-icon>
								<span>更换头像</span>
							</div>
						</el-upload>
					</div>
					<div class="user-name">{{ profileStore.userInfo.nickname || profileStore.userInfo.username }}</div>
					<div class="user-role">
						<el-tag type="primary" size="small">{{ profileStore.userInfo.role }}</el-tag>
					</div>
					<el-divider />
					<div class="user-meta">
						<div class="meta-item">
							<el-icon><User /></el-icon>
							<span>用户名：{{ profileStore.userInfo.username }}</span>
						</div>
						<div class="meta-item">
							<el-icon><Clock /></el-icon>
							<span>注册时间：{{ profileStore.userInfo.createTime }}</span>
						</div>
					</div>
				</el-card>
			</el-col>

			<!-- 右侧设置区域 -->
			<el-col :xs="24" :md="16">
				<el-card shadow="never" class="setting-card">
					<el-tabs v-model="activeTab">
						<!-- 基本信息 Tab -->
						<el-tab-pane label="基本信息" name="info">
							<el-form
								ref="infoFormRef"
								:model="infoForm"
								:rules="infoRules"
								label-width="80px"
								class="setting-form"
							>
								<el-form-item label="用户名">
									<el-input v-model="profileStore.userInfo.username" disabled />
								</el-form-item>
								<el-form-item label="昵称" prop="nickname">
									<el-input v-model="infoForm.nickname" placeholder="请输入昵称" maxlength="20" />
								</el-form-item>
								<el-form-item label="邮箱" prop="email">
									<el-input v-model="infoForm.email" placeholder="请输入邮箱" />
								</el-form-item>
								<el-form-item label="手机号" prop="phone">
									<el-input v-model="infoForm.phone" placeholder="请输入手机号" maxlength="11" />
								</el-form-item>
								<el-form-item label="个人简介">
									<el-input
										v-model="infoForm.bio"
										type="textarea"
										:rows="4"
										placeholder="请输入个人简介"
										maxlength="200"
										show-word-limit
									/>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="handleSaveInfo" :loading="infoSaving">
										保存
									</el-button>
									<el-button @click="handleResetInfo">重置</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>

						<!-- 修改密码 Tab -->
						<el-tab-pane label="修改密码" name="password">
							<el-form
								ref="pwdFormRef"
								:model="pwdForm"
								:rules="pwdRules"
								label-width="100px"
								class="setting-form"
							>
								<el-form-item label="旧密码" prop="oldPassword">
									<el-input
										v-model="pwdForm.oldPassword"
										type="password"
										placeholder="请输入旧密码"
										show-password
									/>
								</el-form-item>
								<el-form-item label="新密码" prop="newPassword">
									<el-input
										v-model="pwdForm.newPassword"
										type="password"
										placeholder="请输入新密码"
										show-password
										@input="checkPasswordStrength"
									/>
								</el-form-item>
								<el-form-item label="密码强度" v-if="pwdForm.newPassword">
									<div class="strength-bar">
										<div
											class="strength-segment"
											v-for="i in 3"
											:key="i"
											:class="strengthClass(i)"
										/>
									</div>
									<span class="strength-text" :class="strengthTextClass">{{ strengthLabel }}</span>
								</el-form-item>
								<el-form-item label="确认密码" prop="confirmPassword">
									<el-input
										v-model="pwdForm.confirmPassword"
										type="password"
										placeholder="请再次输入新密码"
										show-password
									/>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="handleSavePassword" :loading="pwdSaving">
										保存
									</el-button>
									<el-button @click="handleResetPassword">重置</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-col>
		</el-row>

		<!-- 头像预览弹窗 -->
		<el-dialog v-model="avatarDialogVisible" title="头像预览" width="440px" :close-on-click-modal="false">
			<div class="avatar-preview-box">
				<img :src="avatarPreviewUrl" class="avatar-preview-img" />
			</div>
			<template #footer>
				<el-button @click="avatarDialogVisible = false">取消</el-button>
				<el-button type="primary" @click="handleConfirmAvatar" :loading="avatarSaving">
					确认上传
				</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<style lang="scss" scoped>
.profile-container {
	padding: 0;

	.user-card {
		margin-bottom: 20px;
		text-align: center;

		:deep(.el-card__body) {
			padding: 30px 20px;
		}

		.avatar-section {
			position: relative;
			display: inline-block;
			cursor: pointer;

			.avatar-upload {
				display: block;
			}

			.avatar-img {
				display: block;
			}

			.avatar-mask {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background: rgba(0, 0, 0, 0.4);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 12px;
				gap: 4px;
				opacity: 0;
				transition: opacity 0.3s;

				&:hover {
					opacity: 1;
				}
			}

			&:hover .avatar-mask {
				opacity: 1;
			}
		}

		.user-name {
			font-size: 20px;
			font-weight: 600;
			color: #303133;
			margin-top: 16px;
		}

		.user-role {
			margin-top: 8px;
		}

		.user-meta {
			text-align: left;
			padding: 0 10px;

			.meta-item {
				display: flex;
				align-items: center;
				gap: 8px;
				color: #606266;
				font-size: 14px;
				line-height: 32px;

				.el-icon {
					color: #909399;
				}
			}
		}
	}

	.setting-card {
		margin-bottom: 20px;

		:deep(.el-card__body) {
			padding: 0;
		}

		:deep(.el-tabs__header) {
			padding: 0 20px;
			margin-bottom: 0;
		}

		:deep(.el-tabs__content) {
			padding: 20px;
		}

		.setting-form {
			max-width: 480px;
		}
	}

	.strength-bar {
		display: flex;
		gap: 6px;
		margin-top: 4px;

		.strength-segment {
			width: 48px;
			height: 6px;
			border-radius: 3px;
			background: #e4e7ed;
			transition: background 0.3s;

			&.weak { background: #f56c6c; }
			&.medium { background: #e6a23c; }
			&.strong { background: #67c23a; }
		}
	}

	.strength-text {
		font-size: 12px;
		margin-left: 8px;

		&.weak { color: #f56c6c; }
		&.medium { color: #e6a23c; }
		&.strong { color: #67c23a; }
	}

	.avatar-preview-box {
		text-align: center;

		.avatar-preview-img {
			max-width: 300px;
			max-height: 300px;
			border-radius: 8px;
		}
	}
}
</style>

<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { User, Clock, Camera } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();

const activeTab = ref("info");

const infoFormRef = ref(null);
const pwdFormRef = ref(null);
const infoSaving = ref(false);
const pwdSaving = ref(false);
const avatarSaving = ref(false);

const infoForm = reactive({
	nickname: "",
	email: "",
	phone: "",
	bio: ""
});

const infoRules = {
	email: [
		{ type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
	],
	phone: [
		{ pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
	]
};

const pwdForm = reactive({
	oldPassword: "",
	newPassword: "",
	confirmPassword: ""
});

const validateConfirmPassword = (rule, value, callback) => {
	if (value !== pwdForm.newPassword) {
		callback(new Error("两次输入的密码不一致"));
	} else {
		callback();
	}
};

const pwdRules = {
	oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
	newPassword: [
		{ required: true, message: "请输入新密码", trigger: "blur" },
		{ min: 6, message: "密码至少6位", trigger: "blur" }
	],
	confirmPassword: [
		{ required: true, message: "请确认新密码", trigger: "blur" },
		{ validator: validateConfirmPassword, trigger: "blur" }
	]
};

const passwordStrength = ref(0);

const strengthLabel = computed(() => {
	if (passwordStrength.value === 0) return "";
	if (passwordStrength.value === 1) return "弱";
	if (passwordStrength.value === 2) return "中";
	return "强";
});

const strengthTextClass = computed(() => {
	if (passwordStrength.value === 1) return "weak";
	if (passwordStrength.value === 2) return "medium";
	return "strong";
});

const strengthClass = (i) => {
	if (i <= passwordStrength.value) {
		if (passwordStrength.value === 1) return "weak";
		if (passwordStrength.value === 2) return "medium";
		return "strong";
	}
	return "";
};

const checkPasswordStrength = () => {
	const pwd = pwdForm.newPassword;
	if (!pwd) {
		passwordStrength.value = 0;
		return;
	}
	let score = 0;
	if (pwd.length >= 8) score++;
	if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
	if (/[0-9]/.test(pwd)) score++;
	if (/[^a-zA-Z0-9]/.test(pwd)) score++;
	if (score <= 1) passwordStrength.value = 1;
	else if (score <= 3) passwordStrength.value = 2;
	else passwordStrength.value = 3;
};

const fillInfoForm = () => {
	const u = profileStore.userInfo;
	infoForm.nickname = u.nickname || "";
	infoForm.email = u.email || "";
	infoForm.phone = u.phone || "";
	infoForm.bio = u.bio || "";
};

const handleSaveInfo = async () => {
	const valid = await infoFormRef.value?.validate().catch(() => false);
	if (!valid) return;
	infoSaving.value = true;
	const success = await profileStore.updateInfo({ ...infoForm });
	infoSaving.value = false;
};

const handleResetInfo = () => {
	fillInfoForm();
};

const handleSavePassword = async () => {
	const valid = await pwdFormRef.value?.validate().catch(() => false);
	if (!valid) return;
	pwdSaving.value = true;
	const success = await profileStore.doChangePassword({
		oldPassword: pwdForm.oldPassword,
		newPassword: pwdForm.newPassword
	});
	pwdSaving.value = false;
	if (success) {
		handleResetPassword();
	}
};

const handleResetPassword = () => {
	pwdForm.oldPassword = "";
	pwdForm.newPassword = "";
	pwdForm.confirmPassword = "";
	passwordStrength.value = 0;
	pwdFormRef.value?.resetFields();
};

const avatarDialogVisible = ref(false);
const avatarPreviewUrl = ref("");
let pendingAvatarFile = null;

const handleAvatarChange = (file) => {
	pendingAvatarFile = file.raw;
	const reader = new FileReader();
	reader.onload = (e) => {
		avatarPreviewUrl.value = e.target.result;
		avatarDialogVisible.value = true;
	};
	reader.readAsDataURL(file.raw);
};

const handleConfirmAvatar = async () => {
	if (!avatarPreviewUrl.value) return;
	avatarSaving.value = true;
	const success = await profileStore.updateAvatar(avatarPreviewUrl.value);
	avatarSaving.value = false;
	if (success) {
		avatarDialogVisible.value = false;
	}
};

onMounted(async () => {
	await profileStore.fetchUserInfo();
	fillInfoForm();
});
</script>
