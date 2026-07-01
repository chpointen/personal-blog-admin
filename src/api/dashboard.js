import axios from "@/utils/axios";

export function getStats() {
	return axios({ url: "/dashboard/stats", method: "post" });
}

export function getArticleTrend() {
	return axios({ url: "/dashboard/articleTrend", method: "post" });
}

export function getCategoryDistribution() {
	return axios({ url: "/dashboard/categoryDistribution", method: "post" });
}

export function getTopArticles() {
	return axios({ url: "/dashboard/topArticles", method: "post" });
}

export function getLatestArticles() {
	return axios({ url: "/dashboard/latestArticles", method: "post" });
}
