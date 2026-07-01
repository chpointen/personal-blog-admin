<template>
	<div class="hamburger-container" @click="toggleClick">
		<svg-icon id="guide-hamburger" class="hamburger" :icon="icon"></svg-icon>
	</div>
</template>

<style lang="scss" scoped>
  .hamburger-container {
    padding: 0 16px;
    .hamburger {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
</style>

<script setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
// 点击时触发状态切换
const toggleClick = () => {
	appStore.toggleSidebar();
};
// 根据状态切换图标
const icon = computed(() =>
	appStore.sidebarOpened ? "hamburger-opened" : "hamburger-closed"
);
</script>