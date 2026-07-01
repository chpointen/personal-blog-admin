<template>
	<div class="dashboard-container" v-loading="dashboardStore.loading">
		<!-- 数据概览卡片 -->
		<el-row :gutter="20" class="stat-row">
			<el-col :xs="24" :sm="12" :md="6">
				<el-card shadow="hover" class="stat-card">
					<div class="stat-inner">
						<div class="stat-icon article-icon">
							<el-icon :size="32"><Document /></el-icon>
						</div>
						<div class="stat-info">
							<div class="stat-value">{{ dashboardStore.stats.articleCount }}</div>
							<div class="stat-label">文章总数</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="12" :md="6">
				<el-card shadow="hover" class="stat-card">
					<div class="stat-inner">
						<div class="stat-icon category-icon">
							<el-icon :size="32"><Folder /></el-icon>
						</div>
						<div class="stat-info">
							<div class="stat-value">{{ dashboardStore.stats.categoryCount }}</div>
							<div class="stat-label">分类总数</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="12" :md="6">
				<el-card shadow="hover" class="stat-card">
					<div class="stat-inner">
						<div class="stat-icon tag-icon">
							<el-icon :size="32"><Collection /></el-icon>
						</div>
						<div class="stat-info">
							<div class="stat-value">{{ dashboardStore.stats.tagCount }}</div>
							<div class="stat-label">标签总数</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="12" :md="6">
				<el-card shadow="hover" class="stat-card">
					<div class="stat-inner">
						<div class="stat-icon views-icon">
							<el-icon :size="32"><View /></el-icon>
						</div>
						<div class="stat-info">
							<div class="stat-value">{{ dashboardStore.stats.totalViews }}</div>
							<div class="stat-label">总访问量</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 图表区域第一行 -->
		<el-row :gutter="20" class="chart-row">
			<el-col :xs="24" :lg="12">
				<el-card shadow="never" class="chart-card">
					<template #header>
						<span class="chart-title">文章发布趋势</span>
					</template>
					<div ref="trendChartRef" class="chart-box"></div>
				</el-card>
			</el-col>
			<el-col :xs="24" :lg="12">
				<el-card shadow="never" class="chart-card">
					<template #header>
						<span class="chart-title">分类文章分布</span>
					</template>
					<div ref="pieChartRef" class="chart-box"></div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 图表区域第二行 -->
		<el-row :gutter="20" class="chart-row">
			<el-col :span="24">
				<el-card shadow="never" class="chart-card">
					<template #header>
						<span class="chart-title">热门文章排行</span>
					</template>
					<div ref="barChartRef" class="chart-box chart-box-tall"></div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 最新文章列表 -->
		<el-row :gutter="20" class="table-row">
			<el-col :span="24">
				<el-card shadow="never">
					<template #header>
						<span class="chart-title">最新文章</span>
					</template>
					<el-table :data="dashboardStore.latestArticles" stripe border style="width: 100%">
						<el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
						<el-table-column prop="category" label="分类" width="120" />
						<el-table-column label="标签" width="200">
							<template #default="{ row }">
								<el-tag
									v-for="tag in row.tags"
									:key="tag"
									size="small"
									style="margin-right: 4px"
								>
									{{ tag }}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="views" label="访问量" width="100" align="center" />
						<el-table-column label="状态" width="90" align="center">
							<template #default="{ row }">
								<el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">
									{{ row.status === 1 ? '已发布' : '草稿' }}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="createTime" label="发布时间" width="170" />
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<style lang="scss" scoped>
.dashboard-container {
	padding: 0;

	.stat-row {
		margin-bottom: 20px;
	}

	.stat-card {
		margin-bottom: 16px;

		.stat-inner {
			display: flex;
			align-items: center;
			gap: 16px;
		}

		.stat-icon {
			width: 60px;
			height: 60px;
			border-radius: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
		}

		.article-icon { background: linear-gradient(135deg, #409eff, #337ecc); }
		.category-icon { background: linear-gradient(135deg, #67c23a, #529b2e); }
		.tag-icon { background: linear-gradient(135deg, #e6a23c, #cc8c2e); }
		.views-icon { background: linear-gradient(135deg, #f56c6c, #d94f4f); }

		.stat-info {
			flex: 1;
		}

		.stat-value {
			font-size: 28px;
			font-weight: 700;
			color: #303133;
			line-height: 1.2;
		}

		.stat-label {
			font-size: 14px;
			color: #909399;
			margin-top: 4px;
		}
	}

	.chart-row {
		margin-bottom: 20px;
	}

	.chart-card {
		margin-bottom: 16px;

		:deep(.el-card__header) {
			padding: 14px 20px;
			border-bottom: 1px solid #ebeef5;
		}
	}

	.chart-title {
		font-size: 15px;
		font-weight: 600;
		color: #303133;
	}

	.chart-box {
		width: 100%;
		height: 320px;
	}

	.chart-box-tall {
		height: 360px;
	}

	.table-row {
		margin-bottom: 20px;
	}
}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { Document, Folder, Collection, View } from "@element-plus/icons";
import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useDashboardStore } from "@/stores/dashboard";

echarts.use([
	BarChart,
	LineChart,
	PieChart,
	GridComponent,
	LegendComponent,
	TooltipComponent,
	CanvasRenderer
]);

const dashboardStore = useDashboardStore();

const trendChartRef = ref(null);
const pieChartRef = ref(null);
const barChartRef = ref(null);

let trendChart = null;
let pieChart = null;
let barChart = null;

const initTrendChart = () => {
	if (!trendChartRef.value) return;
	trendChart = echarts.init(trendChartRef.value);
	const { months, counts } = dashboardStore.articleTrend;
	trendChart.setOption({
		tooltip: { trigger: "axis" },
		grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
		xAxis: { type: "category", data: months, boundaryGap: false },
		yAxis: { type: "value", minInterval: 1 },
		series: [{
			name: "发布数量", type: "line", data: counts,
			smooth: true, symbol: "circle", symbolSize: 8,
			itemStyle: { color: "#409eff" },
			areaStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: "rgba(64,158,255,0.3)" },
					{ offset: 1, color: "rgba(64,158,255,0.02)" }
				])
			}
		}]
	});
};

const initPieChart = () => {
	if (!pieChartRef.value) return;
	pieChart = echarts.init(pieChartRef.value);
	const data = dashboardStore.categoryDistribution.map(item => ({
		name: item.name, value: item.value
	}));
	pieChart.setOption({
		tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
		legend: { orient: "vertical", right: "5%", top: "center" },
		series: [{
			name: "分类分布", type: "pie",
			radius: ["45%", "75%"],
			center: ["40%", "50%"],
			avoidLabelOverlap: false,
			itemStyle: { borderRadius: 6, borderColor: "#fff", borderWidth: 2 },
			label: { show: false },
			emphasis: {
				label: { show: true, fontSize: 16, fontWeight: "bold" }
			},
			data
		}]
	});
};

const initBarChart = () => {
	if (!barChartRef.value) return;
	barChart = echarts.init(barChartRef.value);
	const topArticles = dashboardStore.topArticles;
	barChart.setOption({
		tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
		grid: { left: "3%", right: "10%", bottom: "3%", containLabel: true },
		xAxis: {
			type: "value", name: "访问量",
			axisLabel: { formatter: "{value}" }
		},
		yAxis: {
			type: "category",
			data: topArticles.map(a => a.title).reverse(),
			axisLabel: { width: 120, overflow: "truncate" }
		},
		series: [{
			name: "访问量", type: "bar",
			data: topArticles.map(a => a.views).reverse(),
			itemStyle: {
				color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
					{ offset: 0, color: "#409eff" },
					{ offset: 1, color: "#79bbff" }
				])
			},
			barMaxWidth: 30
		}]
	});
};

const renderCharts = async () => {
	await nextTick();
	initTrendChart();
	initPieChart();
	initBarChart();
};

const destroyCharts = () => {
	trendChart?.dispose();
	pieChart?.dispose();
	barChart?.dispose();
	trendChart = null;
	pieChart = null;
	barChart = null;
};

watch(
	() => dashboardStore.loading,
	(val) => {
		if (!val) {
			renderCharts();
		}
	}
);

onMounted(async () => {
	await dashboardStore.fetchAll();
	renderCharts();
	window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", handleResize);
	destroyCharts();
});

const handleResize = () => {
	trendChart?.resize();
	pieChart?.resize();
	barChart?.resize();
};
</script>
