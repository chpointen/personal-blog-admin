/*将 @element-plus/icons-vue 全部 Icon 组件注册为全局组件*/
import * as components from "@element-plus/icons-vue";

export default {
	install: (app) => {
		for (const key in components) {
			const componentConfig = components[key];
			app.component(componentConfig.name, componentConfig);
		}
	}
};