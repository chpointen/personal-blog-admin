import { defineStore } from "pinia";
import { getStats, getArticleTrend, getCategoryDistribution, getTopArticles, getLatestArticles } from "@/api/dashboard";

export const useDashboardStore = defineStore("dashboard", {
	state: () => ({
		stats: { articleCount: 0, categoryCount: 0, tagCount: 0, totalViews: 0 },
		articleTrend: { months: [], counts: [] },
		categoryDistribution: [],
		topArticles: [],
		latestArticles: [],
		loading: false
	}),
	actions: {
		async fetchAll() {
			this.loading = true;
			try {
				const [statsRes, trendRes, distRes, topRes, latestRes] = await Promise.all([
					getStats(),
					getArticleTrend(),
					getCategoryDistribution(),
					getTopArticles(),
					getLatestArticles()
				]);
				this.stats = statsRes.obj || this.stats;
				this.articleTrend = trendRes.obj || this.articleTrend;
				this.categoryDistribution = distRes.obj || [];
				this.topArticles = topRes.obj || [];
				this.latestArticles = latestRes.obj || [];
			} catch {
				//
			} finally {
				this.loading = false;
			}
		}
	}
});
