import { defineStore } from "pinia";
import { TAGS_VIEW } from "@/constant";
import { getItem, setItem } from "@/utils/storage";

export const useAppStore = defineStore("app", {
	state: () => ({
		sidebarOpened: true,
		tagsViewList: getItem(TAGS_VIEW) || []
	}),
	actions: {
		toggleSidebar() {
			this.sidebarOpened = !this.sidebarOpened;
		},
		addTagsViewList(tag) {
			const isFind = this.tagsViewList.find(item => {
				return item.path === tag.path;
			});
			if (!isFind) {
				this.tagsViewList.push(tag);
				setItem(TAGS_VIEW, this.tagsViewList);
			}
		},
		removeTagsView(payload) {
			if (payload.type === "index") {
				this.tagsViewList.splice(payload.index, 1);
			} else if (payload.type === "other") {
				this.tagsViewList.splice(
					payload.index + 1,
					this.tagsViewList.length - payload.index + 1
				);
				this.tagsViewList.splice(0, payload.index);
				if (payload.index != 0) {
					this.tagsViewList.unshift({
						fullPath: "/home",
						meta: { title: "首页", affix: true },
						name: "home",
						params: {},
						path: "/home",
						query: {},
						title: "首页"
					});
				}
			} else if (payload.type === "right") {
				this.tagsViewList.splice(
					payload.index + 1,
					this.tagsViewList.length - payload.index + 1
				);
			} else if (payload.type === "all") {
				this.tagsViewList = [];
			}
			setItem(TAGS_VIEW, this.tagsViewList);
		}
	}
});
