"use client";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.log("Response error:", error.response.data);
      console.log("Status:", error.response.status);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      console.log("Request error:", error.request);
    } else {
      console.log("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
