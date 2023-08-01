import axios from 'axios';
import { API } from '../helpers/api';

const privateApi = axios.create();

privateApi.interceptors.request.use(
	(config) => {
		const accesstoken = localStorage.getItem('accessToken');
		if (accesstoken) {
			config.headers.Authorization = `Bearer ${accesstoken}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

privateApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const request = error.config;
		if (error.response.status === 401 && !request._retry) {
			request._retry = true;

			try {
				const refreshToken = localStorage.getItem('refreshToken');
				const response = await axios.get(API.auth.refresh, {
					headers: {
						Authorization: `Bearer ${refreshToken}`,
					},
				});
				const { accessToken } = response.data;
				localStorage.setItem('accessToken', accessToken);
				request.headers.authorization = `Bearer ${accessToken}`;
				return axios(request);
			} catch (error) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
			}
		}
		return Promise.reject(error);
	},
);

export default privateApi;
