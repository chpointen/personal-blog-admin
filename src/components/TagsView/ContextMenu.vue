<template>
	<ul class="context-menu-container">
		<li @click="onRefreshClick">
			刷新
		</li>
		<li @click="onCloseRightClick">
			关闭右侧
		</li>
		<li @click="onCloseOtherClick">
			关闭其他
		</li>
		<li @click="onCloseAllClick">
			关闭全部
		</li>
	</ul>
</template>

<style lang="scss" scoped>
  .context-menu-container {
    position: fixed;
    z-index: 3000;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    background: #fff;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    font-weight: 400;
    font-size: 12px;
    color: #333;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
</style>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";

const props = defineProps({
	index: {
		type: Number,
		required: true
	}
});

const router = useRouter();
const appStore = useAppStore();
const onRefreshClick = () => {
	router.go(0);
};

const onCloseRightClick = () => {
	appStore.removeTagsView({
		type: "right",
		index: props.index
	});
};

const onCloseOtherClick = () => {
	appStore.removeTagsView({
		type: "other",
		index: props.index
	});
};

const onCloseAllClick = () => {
	appStore.removeTagsView({
		type: "all",
		index: props.index
	});

	router.push("/");
};

</script>