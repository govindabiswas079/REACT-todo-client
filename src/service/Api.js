import axios from 'axios';

export const Api = () => {
    const AXIOS = axios.create({
        baseURL: 'http://localhost:8181/api',
    });

    AXIOS.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        try {
            if (token) {                
                config.headers.Authorization = `Bearer ${token}`;
                config.headers.Accept = 'application/json, text/plain, */*';
                config.headers.ContentType = 'application/json';
            } else {
                config.headers.Accept = 'application/json, text/plain, */*';
                config.headers.ContentType = 'application/json';
            }

            return config;
        } catch (error) {
            return Promise.reject(error);
        }
    })

    AXIOS.interceptors.response.use(function (response) {
        try {
            return response?.data;
        } catch (error) {
            return Promise.reject(error);
        }
    })

    return AXIOS;
};
