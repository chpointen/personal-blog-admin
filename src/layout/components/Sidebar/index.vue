<template>
	<div class="">
		<div class="logo-container">
			<!-- logo -->
			<el-avatar
				:size="logoHeight"
				src="https://tse3-mm.cn.bing.net/th/id/OIP-C.biUDm5EuVYt0grAOsLOcXAAAAA?w=132&h=157&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.3&pid=1.7&rm=3"
			/>
			<!-- 系统标题 -->
			<h1 v-if="appStore.sidebarOpened" class="logo-title">
				Vue3后台系统
			</h1>
		</div>
		<el-scrollbar>
			<!-- 引入菜单组件 -->
			<sidebar-menu></sidebar-menu>
		</el-scrollbar>
	</div>
</template>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 22px;
  height: v-bind(logoheight) + "px";
  .logo-title {
    margin-left: 10px;
    line-height: 50px;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    white-space: nowrap;
  }
}
</style>

<script setup>
import SidebarMenu from "./SidebarMenu";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
const logoHeight = 32;
</script>