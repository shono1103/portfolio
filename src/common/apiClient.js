import axios from "axios";

const normalizeBaseUrl = (value) => {
	if (!value) {
		return null;
	}

	return value.endsWith("/") ? value.slice(0, -1) : value;
};

const API_BASE_URL =
	normalizeBaseUrl(process.env.REACT_APP_API_BASE_URL) || "http://localhost:8000";

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	withCredentials: false,
	timeout: 5000,
});

const routes = {
	listSkills: () => "/api/skills",
	listProjects: () => "/api/projects",
	listJobs: () => "/api/jobs",
};

const unwrap = (response) => response.data;

export const skillsApi = {
	async list(options = {}) {
		const response = await apiClient.get(routes.listSkills(), options);
		return unwrap(response);
	},
};

export const projectsApi = {
	async list(options = {}) {
		const response = await apiClient.get(routes.listProjects(), options);
		return unwrap(response);
	},
};

export const jobsApi = {
	async list(options = {}) {
		const response = await apiClient.get(routes.listJobs(), options);
		return unwrap(response);
	},
};

export default apiClient;
